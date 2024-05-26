"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {useState, useTransition} from "react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {LoginSchema} from "@/schemas";
import {useSearchParams} from "next/navigation";
import {zodResolver} from "@hookform/resolvers/zod"

import {FormError} from "@/components/form-error";
import {FormSuccess} from "@/components/form-success";

import {login} from "@/actions/login";

import {CardWrapper} from "./card-wrapper";
import { CardDescription, CardTitle } from "../ui/card";
import { useUserStore } from "@/store/user-store";

export const LoginForm = () => {
    
    const setUserName = useUserStore((state) => state.setUserName);

    const searchParams = useSearchParams()!;
    const callbackUrl = searchParams?.get("callbackUrl")!;

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values, callbackUrl)
                .then((data : any) => {
                    if (data?.error) {
                        setUserName(values.username) 
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Что то пошло не так:("));
        });
    };

    return (
        <CardWrapper
        headerLabel="Авторизация"
        backButtonLabel="У вас нет аккаунта?"
        backButtonHref="/auth/register"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Введите имя"
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="******"
                                            type="password"
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
                        variant="default"
                        type="submit"
                        className="w-full"
                    >
                        Войти
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
}