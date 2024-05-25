import { unCompleteTask } from "@/actions/task";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request, res: Response) {
  const id = await request.json();
  console.log(id);
  try {
    await unCompleteTask(id);
    return new Response("Uncomplete task");
  } catch (error) {
    console.error("Error uncomplete task:", error);
    return new Response("Error uncomplete task");
  }

}
