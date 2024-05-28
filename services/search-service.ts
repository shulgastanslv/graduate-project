import {db} from "@/db";
import {getSelf} from "@/services/session-service";

export const getSearch = async (term?: string) => {

    let userId;

    try {
        const self = await getSelf();
        userId = self?.id;
    } catch {
        userId = null;
    }

    let users = [];

    if (userId) {
        users = await db.user.findMany({
            where: {
                username: {
                    contains : term,
                }
            },
            select: {
                username: true,
                id: true,
                imageUrl: true,
                updatedAt: true,
            },
            orderBy: [
                {
                    username: "asc",
                },
                {
                    updatedAt: "desc",
                },
            ],
        });
    } else {
        users = await db.user.findMany({
            where: {
                username: {
                    contains : term,
                }
            },
            include: {
                meet: true,
            },
            orderBy: [
                {
                    username: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            
        });
    }

    return users;
};

export const getNewsByTerm = async (term?: string) => {

    let userId;

    try {
        const self = await getSelf();
        userId = self?.id;
    } catch {
        userId = null;
    }

    let users = [];

    if (userId) {
        users = await db.news.findMany({
            where: {
                title: {
                    contains : term,
                }
            },
            select: {
                id: true,
                title: true,
                name: true,
                imageUrl: true,
                content: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: [
                {
                    title: "asc",
                },
                {
                    updatedAt: "desc",
                },
            ],
        });
    } else {
        users = await db.news.findMany({
            where: {
                title: {
                    contains : term,
                }
            },
            orderBy: [
                {
                    title: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            
        });
    }

    return users;
};


export const getAllItemsByTerm = async (term?: string) => {

    let userId;

    try {
        const self = await getSelf();
        userId = self?.id;
    } catch {
        userId = null;
    }

    let items = [];

    if (userId) {
        items = await db.item.findMany({
            where: {
                name: {
                    contains : term,
                }
            },
            select: {
                id: true,
                imageUrl: true,
                name: true,
                description: true,
            },
            orderBy: [
                {
                    name: "asc",
                },
                {
                    updatedAt: "desc",
                },
            ],
        });
    } else {
        items = await db.item.findMany({
            where: {
                name: {
                    contains : term,
                }
            },
            orderBy: [
                {
                    name: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            
        });
    }

    return items;
};



export const getAllTasksByTerm = async (term?: string) => {

    let userId;

    try {
        const self = await getSelf();
        userId = self?.id;
    } catch {
        userId = null;
    }

    let users = [];

    if (userId) {
        users = await db.task.findMany({
            where: {
                title: {
                    contains : term,
                }
            },
            select: {
                id : true,
                title: true,
                description: true,
                timeSpent: true,
                startTime : true,
                endTime: true,
                status: true,
            },
            orderBy: [
                {
                    title: "asc",
                },
                {
                    updatedAt: "desc",
                },
            ],
        });
    } else {
        users = await db.task.findMany({
            where: {
                title: {
                    contains : term,
                }
            },
            orderBy: [
                {
                    title: "desc",
                },
                {
                    updatedAt: "desc",
                },
            ],
            
        });
    }

    return users;
};

