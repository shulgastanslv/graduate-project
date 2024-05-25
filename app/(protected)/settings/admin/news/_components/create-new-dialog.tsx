"use client";

import React, {ElementRef, useRef, useState, useTransition} from "react";

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

import {NewsScheme, RegisterSchema} from "@/schemas";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";
import {register} from "@/actions/register";
import {useRouter} from "next/navigation";
import {useCurrentUser} from "@/hooks/use-current-user";
import {createNews} from "@/actions/news";
import Markdown from "react-markdown";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

import * as commands from "@uiw/react-md-editor/commands"

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

interface CreateNewModalProps {
};


export const CreateNewModal = ({
                                }: CreateNewModalProps) => {

    const closeRef = useRef<ElementRef<"button">>(null);
    const router = useRouter();
    const user = useCurrentUser()!;
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const [value, setValue] = useState("");

    const form = useForm<z.infer<typeof NewsScheme>>({
        resolver: zodResolver(NewsScheme),
        defaultValues: {
            title: "",
            author: "",
            name : user?.name!,
            content: value,
            imageUrl: "",
        },
    });

    const onSubmit = (values: z.infer<typeof NewsScheme>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            createNews(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                    router.refresh();
                });
        });
    };

    // @ts-ignore
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="sm" className="ml-auto">
                    Добавить новость
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-auto">
                <DialogHeader>
                    <DialogTitle>Основная Информация</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Заголовок</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Введите автора</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Контент</FormLabel>
                                        <FormControl>
                                            <MDEditor className="h-96" {...field}  />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error}/>
                        <FormSuccess message={success}/>
                        <Button
                            disabled={isPending}
                            type="submit"
                            className="w-full"
                        >
                            Добавить
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};