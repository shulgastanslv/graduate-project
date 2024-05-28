import { db } from "@/db";
import { getSelf } from "./session-service";

export const getMeetByUserId = async (userId: string) => {
  const meet = await db.meet.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
      roomId: true,
      updatedAt: true,
      createdAt: true,
      endTime: true,
      startTime: true,
      userId: true,
    },
  });

  return meet;
};

export const getMeetById = async (id: string) => {
  const meet = await db.meet.findUnique({
    where: {
      userId: id,
    },
    select: {
      id: true,
      roomId: true,
      updatedAt: true,
      createdAt: true,
      endTime: true,
      startTime: true,
      userId: true,
    },
  });

  return meet;
};

export const createMeet = async (
  id: string,
  roomId: string,
  userId: string
) => {
  const meet = await db.meet.create({
    data: {
      id,
      roomId,
      userId,
      isLive: true,
      startTime: new Date(),
    },
  });

  return meet;
};

export const endMeet = async (roomId: string) => {
  const meet = await db.meet.findFirst({
    where: {
      roomId,
    },
  });

  await db.meet.delete({
    where: {
      id: meet?.id,
    },
  });
};

export const getAllMeets = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self?.id;
  } catch {
    userId = null;
  }

  let meets = await db.meet.findMany({
    where: {
      user: {
        blockedBy: {
          none: {
            blockerId: userId!,
          },
        },
        NOT: {
          id: userId!,
        },
      },
      isLive: true,
    },
    select: {
      id: true,
      user: {
        select: {
          username: true,
          blockedBy: true,
        },
      },
      roomId: true,
      isLive: true,
      startTime: true,
    },
    orderBy: [
      {
        isLive: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });

  return meets;
};
