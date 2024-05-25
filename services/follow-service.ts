import {db} from "@/db";
import { getSelf } from "./session-service";

export const getFollowedUsers = async () => {
    try {
        const self = await getSelf();

        const followedUsers = db.follow.findMany({
            where: {
                followerId: self?.id,
                following: {
                    blocking: {
                        none: {
                            blockedId: self?.id,
                        },
                    },
                },
            },
            include: {
                following: {
                    include: {
                        meet: {
                            select: {
                                isLive: true,
                            },
                        },
                    },
                },
            },
        });

        return followedUsers;
    } catch {
        return [];
    }
};

export const isFollowingUser = async (id: string, selfId: string) => {
    try {

        const otherUser = await db.user.findUnique({
            where: {id},
        });

        if (!otherUser) {
            throw new Error("Пользователь не найден!");
        }

        if (otherUser.id === selfId) {
            return true;
        }

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: selfId,
                followingId: otherUser.id,
            },
        });

        return !!existingFollow;
    } catch {
        return false;
    }
};

export const followUser = async (id: string, selfId: string) => {

    const otherUser = await db.user.findUnique({
        where: {id},
    });

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: selfId,
            followingId: otherUser?.id!,
        },
    });

    if (existingFollow) {
        throw new Error("Вы уже отслеживаете!");
    }

    const follow = await db.follow.create({
        data: {
            followerId: selfId,
            followingId: otherUser?.id!,
        },
        include: {
            following: true,
            follower: true,
        },
    });

    return follow;
};

export const unfollowUser = async (id: string, selfId: string) => {

    const otherUser = await db.user.findUnique({
        where: {
            id,
        },
    });

    if (!otherUser) {
        throw new Error("Пользователь для скрытия не найден!");
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerId: selfId,
            followingId: otherUser.id,
        },
    });

    if (!existingFollow) {
        throw new Error("Вы не отслеживаете!");
    }

    const follow = await db.follow.delete({
        where: {
            id: existingFollow.id,
        },
        include: {
            following: true,
        },
    });

    return follow;
};