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
      id: me?.id!,
    },
    data: {
      status: UserStatus.Online,
    },
  });

  if (!status) {
    return false;
  }

  return true;
};

export const deleteMeet = async () => {
  
  const self = await getSelf();

  const res = await getMeetById(self?.id!);

  if (!res) {
    return false;
  } else {
    await endMeet(res?.roomId!);
    const status = await setStatusById(self?.id!, UserStatus.Away);
    if (!status) {
      return false;
    }
  }

  return true;
};
