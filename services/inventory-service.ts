import {db} from "@/db";

export const addItemToInventory = async (userId: string, itemData: {
    name: string;
    description?: string;
    imageUrl: string;
}) => {

    if(userId === undefined) {
        return null;
    }

    let inventory = await db.inventory.findUnique({
        where: {
            userId,
        },
    });

    if (!inventory) {
        inventory = await db.inventory.create({
            data: {
                userId,
                quantity: 0,
            },
        });
    }

    const updatedInventory = await db.inventory.update({
        where: {
            userId,
        },
        data: {
            items: {
                create: {
                    ...itemData,
                },
            },
        },
        include: {
            items: true,
        },
    });

    return updatedInventory.items;
};

export const getInventoryByUserId = async (userId: string) => {
    const inventory = await db.inventory.findUnique({
        where: {
            userId,
        },
        include: {
            items: {
                select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    description: true,
                },
            },
        },
    });

    return inventory;
}