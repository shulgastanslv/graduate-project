import { addItemToInventory } from "@/services/inventory-service";
import { NextApiRequest, NextApiResponse } from 'next';

export async function POST(request: Request) {

    const values = await request.json();

    const item = {
        name: values?.name,
        description: values?.description,
        imageUrl: values?.imageUrl,
    };

    const userId = values?.userId;

    try {
        await addItemToInventory(userId, item);
    } catch (error) {
        console.error('Error adding item:', error);
    }

    return Response.json({ values })
}