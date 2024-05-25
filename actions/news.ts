"use server";

import * as z from "zod";
import {NewsScheme, RegisterSchema} from "@/schemas";
import bcrypt from "bcryptjs";
import {getUserByUsername} from "@/services/user-service";
import {randomUUID} from "crypto";
import {db} from "@/db";
import {useCurrentUser} from "@/hooks/use-current-user";
import { News } from "@prisma/client";


export const createNews = async (values: z.infer<typeof NewsScheme>) => {

    const validatedFields = NewsScheme.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Неправильные поля!"};
    }

    const {title, author, name, content, imageUrl} = validatedFields.data;

    const user = await getUserByUsername(author)

    if (!user) {
        return {error: "Такого пользователя нет!"};
    }

    await db.news.create({
        data: {
            title: title,
            name : name,
            content: content,
            imageUrl : imageUrl,
            updatedAt : new Date().toISOString(),
            createdAt: new Date().toISOString(),
            authorId : user?.id!
        },
    });

    return {success: "Новость создана!"};
};


export const deleteNews = async (values: Partial<News>) => {

    const news = await db.news.delete({
        where: {id: values.id},
    });

    return news;
};


export const updateNews = async (values: Partial<News>) => {
    
    const news = await db.news.update({
        where: { id: values?.id },
        data : {
            ...values,
        }
    });
    
    return news;
};
