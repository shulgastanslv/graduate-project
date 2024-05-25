"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import {UserStatus} from "@/lib/status"
import {UserRole} from "@/lib/roles"
import {UserLevel} from "@/lib/level"
import {db} from "@/db";
import {RegisterSchema} from "@/schemas";
import {randomUUID} from "crypto";
import {getUserByUsername} from "@/services/user-service";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Вы ввели неккоректные значения!"};
    }

    const {username, password, level, startedWorking} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByUsername(username);

    if (existingUser) {
        return {error: "Имя уже используется!"};
    }

    let user_lvl

    if (level == "Junior") {
        user_lvl = UserLevel.Junior
    }
    if (level == "Middle") {
        user_lvl = UserLevel.Middle
    }
    if (level == "Senior") {
        user_lvl = UserLevel.Senior
    }

    const id = randomUUID()

    await db.user.create({
        data: {
            id,
            username,
            password: hashedPassword,
            imageUrl: null,
            status: UserStatus.Offline,
            role: UserRole.User,
            bio : null,
            level: user_lvl,
            lastLogin: new Date(),
            startedWorking : new Date(startedWorking),
            createdAt:  new Date(),
            updatedAt: new Date()
        },
    });

    return {success: "Пользователь создан!"};
};