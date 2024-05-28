"use server";

import * as z from "zod";
import {AuthError} from "next-auth";
import {signIn} from "@/auth";
import {LoginSchema} from "@/schemas";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import {getUserByUsername, setStatusById} from "@/services/user-service";
import { UserStatus } from "@/lib/status";

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Вы ввели неккоректные значения!"};
    }

    const {username, password} = validatedFields.data;

    const existingUser = await getUserByUsername(username);

    if (!existingUser?.username) {
        return {error: "Неправильные данные!"}
    }

    await setStatusById(existingUser.id, UserStatus.Away)
    
    try {
        await signIn("credentials", {
            username,
            password,
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Неправильные данные!"}
                default:
                    return {error: "Что-то пошло не так!"}
            }
        }
        throw error
    }
};
