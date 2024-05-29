"use client";
import Link from "next/link";
import Image from "next/image";
import { endMeet, getMeetByUserId } from "@/services/meet-service";
import { useSearchParams } from "next/navigation";
import { getSelf } from "@/services/session-service";
import { deleteMeet } from "@/actions/meet";
import { Button } from "react-day-picker";
import { useTransition } from "react";
import { toast } from "sonner";

export const Logo = () => {

  const [isPending, startTransition] = useTransition();

  const handleClick = (e: any) => {
    startTransition(() => {
      deleteMeet()
        .then(() => {
          console.log("Звонок завершен!");
        })
    });
  };

  return (
    <Link href="/" onClick={(e) => handleClick(e)}>
      <div className="flex items-center marker:hover:opacity-75 transition">
        <div className="rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image src="/logo.svg" alt="CorpNetCast" height="23" width="23" />
        </div>
      </div>
    </Link>
  );
};
