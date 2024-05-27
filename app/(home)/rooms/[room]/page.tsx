"use client";
import {
  LiveKitRoom,
  VideoConference,
  formatChatMessageLinks,
  useToken,
  LocalUserChoices,
} from "@livekit/components-react";
import {
  DeviceUnsupportedError,
  ExternalE2EEKeyProvider,
  Room,
  RoomConnectOptions,
  RoomOptions,
  VideoCodec,
  VideoPresets,
  setLogLevel,
} from "livekit-client";

import dynamic from "next/dynamic";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { DebugMode } from "../../../../lib/Debug";
import { decodePassphrase, useServerUrl } from "../../../../lib/client-utils";
import { SettingsMenu } from "../../../../lib/SettingsMenu";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { endMeet, getMeetByUserId } from "@/services/meet-service";
import { deleteMeet } from "@/actions/meet";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PreJoin = dynamic(
  () => import("@livekit/components-react").then((mod) => mod.PreJoin),
  { ssr: false }
);


const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomName = searchParams?.get("name")!;

  const user = useCurrentUser();
  console.log(roomName);

  const preJoinDefaults = React.useMemo(() => {
    return {
      username: user?.name || "User",
      videoEnabled: false,
      audioEnabled: false,
    };
  }, []);

  const [preJoinChoices, setPreJoinChoices] = React.useState<
    LocalUserChoices | undefined
  >(undefined);

  const handlePreJoinSubmit = React.useCallback((values: LocalUserChoices) => {
    setPreJoinChoices(values);
  }, []);

  const onPreJoinError = React.useCallback((e: any) => {
    console.error(e);
  }, []);

  const onLeave = React.useCallback(async () => {
    await deleteMeet();
    router.push("/");
  }, [router]);

  return (
    <main data-lk-theme="default">
      {roomName && !Array.isArray(roomName) && preJoinChoices ? (
        <ActiveRoom
          roomName={roomName}
          userChoices={preJoinChoices}
          onLeave={onLeave}
        ></ActiveRoom>
      ) : (
        <div className="flex h-full w-full items-center justify-center m-0 pt-24">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>Введите ваше ФИО</CardTitle>
              <CardDescription>Введите ФИО которое будет видно другим участникам звонка</CardDescription>
            </CardHeader>
            <CardContent>
              <PreJoin
                joinLabel="Войти"
                style={{ background: "white", color: "white", width: "450px" }}
                onError={onPreJoinError}
                userLabel="Введите ФИО"
                defaults={preJoinDefaults}
                onSubmit={handlePreJoinSubmit}
              ></PreJoin>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
};

export default Home;

type ActiveRoomProps = {
  userChoices: LocalUserChoices;
  roomName: string;
  region?: string;
  onLeave?: () => void;
};
const ActiveRoom = ({ roomName, userChoices, onLeave }: ActiveRoomProps) => {
  const tokenOptions = React.useMemo(() => {
    return {
      userInfo: {
        identity: userChoices.username,
        name: userChoices.username,
      },
    };
  }, [userChoices.username]);
  const token = useToken(
    process.env.NEXT_PUBLIC_LK_TOKEN_ENDPOINT,
    roomName,
    tokenOptions
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const region = searchParams?.get("region");
  const hq = searchParams?.get("hq");
  const codec = searchParams?.get("codec");

  const e2eePassphrase =
    typeof window !== "undefined" &&
    decodePassphrase(location.hash.substring(1));

  const liveKitUrl = useServerUrl(region as string | undefined);

  const worker =
    typeof window !== "undefined" &&
    e2eePassphrase &&
    new Worker(new URL("livekit-client/e2ee-worker", import.meta.url));

  const e2eeEnabled = !!(e2eePassphrase && worker);
  const keyProvider = new ExternalE2EEKeyProvider();
  const roomOptions = React.useMemo((): RoomOptions => {
    let videoCodec: VideoCodec | undefined = (
      Array.isArray(codec) ? codec[0] : codec ?? "vp9"
    ) as VideoCodec;
    if (e2eeEnabled && (videoCodec === "av1" || videoCodec === "vp9")) {
      videoCodec = undefined;
    }
    return {
      videoCaptureDefaults: {
        deviceId: userChoices.videoDeviceId ?? undefined,
        resolution: hq === "true" ? VideoPresets.h2160 : VideoPresets.h720,
      },
      publishDefaults: {
        dtx: false,
        videoSimulcastLayers:
          hq === "true"
            ? [VideoPresets.h1080, VideoPresets.h720]
            : [VideoPresets.h540, VideoPresets.h216],
        red: !e2eeEnabled,
        videoCodec,
      },
      audioCaptureDefaults: {
        deviceId: userChoices.audioDeviceId ?? undefined,
      },
      adaptiveStream: { pixelDensity: "screen" },
      dynacast: true,
      e2ee: e2eeEnabled
        ? {
            keyProvider,
            worker,
          }
        : undefined,
    };
    // @ts-ignore
    setLogLevel("debug", "lk-e2ee");
  }, [userChoices, hq, codec]);

  const room = React.useMemo(() => new Room(roomOptions), []);

  if (e2eeEnabled) {
    keyProvider.setKey(decodePassphrase(e2eePassphrase));
    room.setE2EEEnabled(true).catch((e) => {
      if (e instanceof DeviceUnsupportedError) {
        alert(
          `You're trying to join an encrypted meeting, but your browser does not support it. Please update it to the latest version and try again.`
        );
        console.error(e);
      }
    });
  }
  const connectOptions = React.useMemo((): RoomConnectOptions => {
    return {
      autoSubscribe: true,
    };
  }, []);

  return (
    <>
      {liveKitUrl && (
        <LiveKitRoom
          room={room}
          token={token}
          style={{ background: "white", color: "white", accentColor: "white", outlineColor: "black",
           }}
          serverUrl={liveKitUrl}
          connectOptions={connectOptions}
          video={userChoices.videoEnabled}
          audio={userChoices.audioEnabled}
          onDisconnected={onLeave}
        >
          <VideoConference
            chatMessageFormatter={formatChatMessageLinks}
            SettingsComponent={
              process.env.NEXT_PUBLIC_SHOW_SETTINGS_MENU === "true"
                ? SettingsMenu
                : undefined
            }
          />
          <DebugMode />
        </LiveKitRoom>
      )}
    </>
  );
};
