"use server";

import { db } from "@/db";
import { addItemToInventory } from "@/services/inventory-service";
import { error } from "console";

export const deleteItem = async (id: string) => {
  const task = await db.item.delete({
    where: { id: id },
  });

  return task;
};

type Item = {
  name: string;
  description: string;
  imageUrl: string;
  userId: string;
};

export const sendItem = async (item: Item) => {
  
  const userId = item?.userId;

  const value = {
    name: item?.name,
    description: item?.description,
    imageUrl: item?.imageUrl,
};

  try {
    await addItemToInventory(userId, value);
    return { success: "Предмет отправлен" };
  } catch (error) {
    console.error("Не удалось отправить предмет!:", error);
    return { error: "Не удалось отправить предмет!" };
  }

};
