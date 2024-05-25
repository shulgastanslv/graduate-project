import { completeTask, unCompleteTask } from "@/actions/task";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request, res: Response) {
  const id = await request.json();
  console.log(id);
  try {
    await completeTask(id);
    return new Response("Complete task");
  } catch (error) {
    console.error("Error complete task:", error);
    return new Response("Error complete task");
  }

}
