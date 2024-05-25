"use server";

import {User} from "@prisma/client";
import {db} from "@/db";
import { getSelf } from "@/services/session-service";

export const updateUser = async (values: Partial<User>) => {
    
    const user = await db.user.update({
        where: { id: values?.id },
        data : {
            ...values,
        }
    });
    
    return user;
};

export const updateImageUrl = async (imageUrl: string) => {

    const self = await getSelf();

    const user = await db.user.update({
        where: {id: self?.id},
        data: {imageUrl}
    });

    return user;
};


export const deleteUser = async (values: Partial<User>) => {

    const user = await db.user.delete({
        where: {id: values.id},
    });

    return user;
};
