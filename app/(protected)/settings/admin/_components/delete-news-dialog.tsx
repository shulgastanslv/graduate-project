"use client";

import { ElementRef, useRef, useState, useTransition } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useRouter } from "next/navigation";
import {deleteUser} from "@/actions/user";
import {DeleteNewsSchema} from "@/schemas";
import { toast } from "sonner";
import {Delete, DeleteIcon, Edit, Trash} from "lucide-react";
import { deleteNews } from "@/actions/news";


interface DeleteNewsModalProps {
    newsId: string;
};

interface DeleteNewsResult {
    error?: string;
    success?: string;
}


export const DeleteNewsModal = ({
                                  newsId,
                              }: DeleteNewsModalProps) => {

    const closeRef = useRef<ElementRef<"button">>(null);

    const router = useRouter();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof DeleteNewsSchema>>({
        resolver: zodResolver(DeleteNewsSchema),
        defaultValues: {
            id: newsId,
        },
    });

    const onSubmit = (values: z.infer<typeof DeleteNewsSchema>) => {
        setError("");
        setSuccess("");

        const news = {
            id: newsId,
        };

        startTransition(() => {
            deleteNews(news)
                .then(() => {
                    toast.success("Новость была удалена!");
                    setError("");
                })
                .catch(() => {
                    toast.error("Что-то пошло не так!");
                    setError("Что-то пошло не так!");
                });
        });
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="ml-auto w-auto h-6">
                    <Trash className="w-4 h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <FormLabel className="mt-5">Вы уверены?</FormLabel>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="destructive"
                            className="w-full"
                        >
                            Удалить
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};