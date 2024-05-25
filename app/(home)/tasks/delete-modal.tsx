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
import {DeleteSchema, DeleteTaskSchema} from "@/schemas";
import { toast } from "sonner";
import {Delete, DeleteIcon, Edit, Trash} from "lucide-react";
import { deleteTask } from "@/actions/task";


interface DeleteTaskModalProps {
    taskId: string;
};


export const DeleteTaskModal = ({
  taskId,
                              }: DeleteTaskModalProps) => {

    const closeRef = useRef<ElementRef<"button">>(null);

    const router = useRouter();

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof DeleteTaskSchema>>({
        resolver: zodResolver(DeleteTaskSchema),
        defaultValues: {
            id: taskId,
        },
    });

    const onSubmit = () => {
        setError("");
        setSuccess("");

        startTransition(() => {
            deleteTask(taskId)
                .then(() => {
                    toast.success("Задача была удалена!");
                    router.refresh();
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

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}