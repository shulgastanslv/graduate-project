"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import {
  encodePassphrase,
  generateRoomId,
  randomString,
} from "../../../lib/client-utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TabGroup } from "@headlessui/react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createMeet } from "@/services/meet-service";
import { randomUUID } from "crypto";
import { startMeet } from "@/actions/meet";
import { toast } from "sonner";

function DemoMeetingTab({ label }: { label: string }) {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const startMeeting = async () => {
    const roomId = generateRoomId();
    const url = `/rooms/room/?name=${roomId}${
      e2ee ? `#${encodePassphrase(sharedPassphrase)}` : ""
    }`;
    try {
      const meet = await startMeet(roomId);
      if (meet) {
        toast.success("Звонок запущен!")
        router.push(url);
      }
    } catch (error) {
      toast.error(`Не удалось запустить звонок! ${error}`);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-3 rounded-lg">
      <Button
        variant="default"
        onClick={startMeeting}
      >
        Запустить
      </Button>
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <input
            id="use-e2ee"
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Включить end-to-end шифрование
          </label>
        </div>
        {e2ee && (
          <div className="flex flex-row gap-4">
            <label htmlFor="passphrase">Мнемоническая фраза</label>
            <Input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function CustomConnectionTab({ label }: { label: string }) {
  const router = useRouter();
  const [e2ee, setE2ee] = useState(false);
  const [sharedPassphrase, setSharedPassphrase] = useState(randomString(64));

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const serverUrl = formData.get("serverUrl");
    const token = formData.get("token");
    const url = `/custom/?liveKitUrl=${serverUrl}&token=${token}${
      e2ee ? `#${encodePassphrase(sharedPassphrase)}` : ""
    }`;
    console.log(url);
    router.push(url);
  };

  return (
    <form
      className="flex flex-col justify-center gap-3 rounded-lg"
      onSubmit={onSubmit}
    >
      <Input
        id="serverUrl"
        name="serverUrl"
        type="url"
        placeholder="LiveKit Server URL: wss://*.livekit.cloud"
        required
      />
      <Textarea
        id="token"
        name="token"
        placeholder="Token"
        required
        rows={5}
        className="text-inherit leading-inherit"
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <input
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            id="use-e2ee"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          ></input>
          <label htmlFor="use-e2ee">Включить end-to-end шифрование</label>
        </div>

        {e2ee && (
          <div className="flex flex-row gap-4">
            <label htmlFor="passphrase">Мнемоническая фраза</label>
            <Input
              id="passphrase"
              type="password"
              value={sharedPassphrase}
              onChange={(ev) => setSharedPassphrase(ev.target.value)}
            />
          </div>
        )}
      </div>
      <hr className="w-full my-4" />
      <Button className="lk-button px-5 w-full" variant="default" type="submit">
        Запустить
      </Button>
    </form>
  );
}

const Home = () => {
  return (
    <main className="grid justify-center place-content-center justify-items-center pb-24 overflow-auto h-screen">
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>Звонки</CardTitle>
              <CardDescription>
                Проводите звонки с помощью CorpNetCast. Все пользователи смогут
                подключиться к вашему звонку.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DemoMeetingTab label="Демо" />
            </CardContent>
          </Card>
    </main>
  );
};

export default Home;
