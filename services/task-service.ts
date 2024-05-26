import { db } from "@/db";
import { TaskStatus } from "@/lib/status";

export const getTaskComplete = async (userId: string) => {
  const tasks = await db.task.findMany({
    where: {
      userId: userId,
      status: TaskStatus.Complete,
    },
  });

  return tasks;
};


export const getTaskNotStarted = async (userId: string) => {
  const tasks = await db.task.findMany({
    where: {
      userId: userId,
      status: TaskStatus.NotStarted,
    },
  });

  return tasks;
};

function calculateDaysBetween(startTime: Date, endTime: Date): number {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const start = new Date(startTime).setHours(0, 0, 0, 0);
  const end = new Date(endTime).setHours(0, 0, 0, 0);
  const difference = end - start;

  return Math.round(difference / MS_PER_DAY);
}


export const getTasksDays = async (userId: string) => {

  const tasks = await db.task.findMany({
    where: {
      userId: userId,
      status: TaskStatus.Complete,
      startTime: {
        not: null,
      },
      endTime: {
        not: null,
      },
    },
    select: {
      startTime: true,
      endTime: true,
    },
  });


  let totalDaysSpent = 0;

  tasks.forEach((task) => {
    const startTime = new Date(task.startTime!);
    const endTime = task.endTime ? new Date(task.endTime) : new Date();

    totalDaysSpent += calculateDaysBetween(startTime, endTime);
  });

  return Math.floor(totalDaysSpent);

};



export const getTasksHours = async (userId: string) => {
  const tasks = await db.task.findMany({
    where: {
      userId: userId,
      status : {
        not : 0,
      },
      timeSpent: {
        not: null,
      },
    },
    select: {
      timeSpent: true,
    },
  });

  const totalTimeSpent = tasks.reduce((total, task) => {
    return total + (task.timeSpent || 0);
  }, 0);

  return Math.floor(totalTimeSpent);
};



export const getAllTasks = async () => {
  
  const tasks = await db.task.findMany({
    select : {
      id : true,
      title: true,
      description: true,
      timeSpent: true,
      startTime : true,
      endTime: true,
      status: true,
    }
  });

  return tasks;
};