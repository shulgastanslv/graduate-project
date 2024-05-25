import * as z from "zod";

export const LoginSchema = z.object({
    username: z.string().min(1, {
        message: "Введите имя",
    }),
    password: z.string().min(1, {
        message: "Введите пароль",
    }),
});

export const RegisterSchema = z.object({
    username: z.string().min(1, {
        message: "Введите имя",
    }),
    password: z.string().min(6, {
        message: "Минимум 6 символов",
    }),
    level: z.string(),
    startedWorking : z.string(),
});


export const UpdateSchema = z.object({
    id: z.string(),
    username: z.string(),
    password: z.string(),
    level: z.string(),
    startedWorking : z.string(),
});


export const UpdateNewsSchema = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    imageUrl: z.string(),
    name : z.string(),
});



export const DeleteSchema = z.object({
    id: z.string(),
});

export const DeleteNewsSchema = z.object({
    id: z.string(),
});
export const DeleteTaskSchema = z.object({
    id: z.string(),
});


export const ItemScheme = z.object({
    name: z.string().min(6, {
        message: "Минимум 6 символов",
    }),
    description: z.string().min(1, {
        message: "Описание обязательно",
    }),
    imageUrl: z.string(),
});

export const TaskScheme = z.object({
    title: z.string().min(4, {
        message: "Минимум 4 символа",
    }),
    description: z.string().min(1, {
        message: "Описание обязательно",
    }),
    dueDate: z.string(),
});


export const NewsScheme = z.object({
    title: z.string().min(6, {
        message: "Минимум 6 символов",
    }),
    name : z.string(),
    author : z.string(),
    content: z.string(),
    imageUrl: z.string(),
});
