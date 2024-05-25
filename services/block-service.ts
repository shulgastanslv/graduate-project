import {db} from "@/db";

export const isBlockedByUser = async (id: string, selfId: string) => {
    try {

        const otherUser = await db.user.findUnique({
            where: {id}
        });

        if (!otherUser) {
            throw new Error("Пользователь не найден!");
        }

        if (otherUser.id === selfId) {
            return false;
        }

        const existingBlock = await db.block.findFirst({
            where: {
                    blockerId: selfId,
                    blockedId: otherUser?.id!,
            },
        });

       return !!existingBlock;
    } catch {
        return false;
    }
};

export const blockUser = async (id: string, selfId: string) => {

    if (selfId === id) {
        throw new Error("Вы не можете скрыть себя!");
    }

    const otherUser = await db.user.findUnique({
        where: {id}
    });

    if (!otherUser) {
        throw new Error("Пользователь не найден!");
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: selfId!,
                blockedId: otherUser.id,
            },
        },
    });

    if (existingBlock) {
        throw new Error("Пользователь уже скрыт!");
    }

    const block = await db.block.create({
        data: {
            blockerId: selfId!,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true,
        },
    });

    return block;
};

export const unblockUser = async (id: string, selfId: string) => {

    if (selfId === id) {
        throw new Error("Вы не можете раскрыть себя!");
    }

    const otherUser = await db.user.findUnique({
        where: {id},
    });

    if (!otherUser) {
        throw new Error("Пользователь не найден!");
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: selfId!,
                blockedId: otherUser.id,
            },
        },
    });

    if (!existingBlock) {
        throw new Error("Пользователь не скрыт.");
    }

    const unblock = await db.block.delete({
        where: {
            id: existingBlock.id,
        },
        include: {
            blocked: true,
        },
    });

    return unblock;
};

export const getBlockedUsers = async (selfId: string) => {

    const blockedUsers = await db.block.findMany({
        where: {
            blockerId: selfId,
        },
        include: {
            blocked: true,
        },
    });

    return blockedUsers;
};