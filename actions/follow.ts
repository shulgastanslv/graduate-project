"use server";

import {revalidatePath} from "next/cache";

import {followUser, unfollowUser} from "@/services/follow-service";
import { getSelf } from "@/services/session-service";

export const onFollow = async (id: string) => {
    try {

        const self = await getSelf();

        if(!self?.id) {
            throw new Error("Вы не авторизованы");
        }
        
        const followedUser = await followUser(id, self.id!);

        revalidatePath("/");

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }

        return followedUser;
    } catch (error) {
        throw new Error("Ошибка при отслеживании пользователя!");
    }
    ;
};

export const onUnfollow = async (id: string) => {
    try {

        const self = await getSelf();

        if(!self?.id) {
            throw new Error("Вы не авторизованы");
        }

        const unfollowedUser = await unfollowUser(id, self.id!);

        revalidatePath("/");

        if (unfollowedUser) {
            revalidatePath(`/${unfollowedUser.following.username}`)
        }

        return unfollowedUser;
    } catch (error) {
        throw new Error("Ошибка при отмене отслеживания пользователя!");
    }
}