import { completeTask, unCompleteTask } from "@/actions/task";
import { getTaskById } from "@/services/task-service";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: Request, res: Response) {
  const id = await request.json();
  console.log(id);
  try {
    const task = await getTaskById(id);
    console.log(task?.title)
    return new Response(JSON.stringify(task), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Ошибка при получении задачи!", error);
    return new Response(
      JSON.stringify({ error: "Ошибка при получении задачи!" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
}
