"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import {TaskStatus, UserStatus} from "@/lib/status"
import {UserRole} from "@/lib/roles"
import {UserLevel} from "@/lib/level"
import {db} from "@/db";
import {RegisterSchema, TaskScheme} from "@/schemas";
import {randomUUID} from "crypto";
import {getUserByUsername} from "@/services/user-service";
import { getSelf } from "@/services/session-service";
import { Task } from "@prisma/client";

export const createTask = async (values: z.infer<typeof TaskScheme>) => {

    const validatedFields = TaskScheme.safeParse(values);

    if (!validatedFields.success) {
        return {error: "Вы ввели неккоректные значения!"};
    }

    const {title, description, dueDate} = validatedFields.data;

    const id = randomUUID()
    const self = await getSelf()

    const endTime = new Date(dueDate)
    const startTime = new Date()
    const timeSpent = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60) // time in hours
    
    await db.task.create({
        data: {
            id,
            status : TaskStatus.NotStarted,
            title,
            description,
            startTime,
            endTime,
            timeSpent,
            userId : self?.id!
        },
    });

    return {success: "Задача создана!"};
};

export const deleteTask = async (id : string) => {

    const task = await db.task.delete({
        where: {id: id},
    });
    
    return {success: "Задача удалена!"};
};

export const updateTask = async (values: Partial<Task>) => {
    
    await db.task.update({
        where: { id: values?.id },
        data : {
            ...values,
        }
    });
    
    return {success: "Задача обновлена!"};
};


export const completeTask = async (id : string) => {

    const self = await getSelf()

    await db.task.update({
        where : {
            id
        },
        data: {
            status : TaskStatus.Complete,
            userId : self?.id!
        },
    });

    return {success: "Задача выполнена!"};
};


export const unCompleteTask = async (id : string) => {

    const self = await getSelf()

    await db.task.update({
        where : {
            id
        },
        data: {
            status : TaskStatus.NotStarted,
            userId : self?.id!
        },
    });

    return {success: "Задача обновлена!"};
};