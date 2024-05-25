import {db} from "@/db";
import { getUserByUsername } from "./user-service";

export interface NewsItem {
    id: string;
    title: string;
    name: string;
    imageUrl: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export const getNews = async () => {
    try {
        return await db.news.findMany();
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
}

export const getNewsById = async (id : string) => {
    const item = await db.news.findUnique({
        where: {id: id}
    });

    return item;
}

export const searchNews = async (term?: string): Promise<NewsItem[]> => {

    return db.news.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: term,
                    },
                },
                {
                    content: {
                        contains: term,
                    }
                },
            ],
        },
        orderBy: {
            updatedAt: "desc",
        },
    });
};

