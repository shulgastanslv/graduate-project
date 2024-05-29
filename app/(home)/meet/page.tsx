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
import { CardStackIcon } from "@radix-ui/react-icons";
import { Video, VideoIcon } from "lucide-react";
import { CardWrapper } from "@/components/auth/card-wrapper";

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
        toast.success("Звонок запущен!");
        router.push(url);
      } else {
        toast.error(`Не удалось запустить звонок!`);
      }
    } catch (error) {
      toast.error(`Не удалось запустить звонок! ${error}`);
    }
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg">
      <Button variant="default" onClick={startMeeting}>
        Начать
      </Button>
      <div className="flex flex-col gap-4 mt-3">
        <div className="flex items-center space-x-2">
          <input
            id="use-e2ee"
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            type="checkbox"
            checked={e2ee}
            onChange={(ev) => setE2ee(ev.target.checked)}
          />
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Включить end-to-end шифрование
          </Label>
        </div>
        {e2ee && (
          <div className="flex flex-row gap-4">
            <Label htmlFor="passphrase">Мнемоническая фраза</Label>
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

// Начните видеозвонок одним щелчком мыши. Просто переходите к разговору,
//       обмену сообщениями и совместному использованию экрана.
const Home = () => {
  return (
    <Card>
      <CardContent className="w-[300px] h-max py-72 items-center justify-center flex flex-col">
        <DemoMeetingTab label="Демо" />
      </CardContent>
    </Card>
  );
};

export default Home;
