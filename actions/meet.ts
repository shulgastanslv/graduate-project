"use server";

import { db } from "@/db";
import { UserStatus } from "@/lib/status";
import { createMeet, endMeet, getMeetById } from "@/services/meet-service";
import { getSelf } from "@/services/session-service";
import { setStatusById } from "@/services/user-service";
import { randomUUID } from "crypto";

export const startMeet = async (roomId: string) => {

  const id = randomUUID();

  const me = await getSelf();

  const res = await createMeet(id, roomId, me?.id!);

  if (!res) {
    return false;
  }

  const status = await db.user.update({
    where: {
        id : me?.id!,
    },
    data: {
      status: 0,
    },
  });


  if (!status) {
    return false;
  }

  return true;
};

export const deleteMeet = async () => {

  const me = await getSelf();

  console.log(me?.id)

  const res = await getMeetById(me?.id!);

  if (!res) {
    return "Не удалось получить звонок";
  }

  const status = await db.user.update({
    where: {
      id : me?.id!,
    },
    data: {
      status: 1,
    },
  });

  
  if (!status) {
    return "Не удалось обновить статус!";
  }

  await endMeet(res?.roomId!);

  return "Звонок завершен!";
};
