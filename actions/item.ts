import { db } from "@/db";
import { Item } from "@prisma/client";

export const deleteItem = async (values: Partial<Item>) => {

    const task = await db.user.delete({
        where: {id: values.id},
    });

    return task;
};
