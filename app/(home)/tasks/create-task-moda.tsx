"use client";

import React, { ElementRef, useRef, useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewsScheme, RegisterSchema, TaskScheme } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createNews } from "@/actions/news";
import Markdown from "react-markdown";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

import * as commands from "@uiw/react-md-editor/commands";
import { Description } from "@radix-ui/react-dialog";
import { createTask } from "@/actions/task";

interface CreateTaskModalProps {}

export const CreateTaskModal = ({}: CreateTaskModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const user = useCurrentUser()!;
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const [value, setValue] = useState("");

  const form = useForm<z.infer<typeof TaskScheme>>({
    resolver: zodResolver(TaskScheme),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const onSubmit = (values: z.infer<typeof TaskScheme>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      createTask(values).then((data) => {
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
        <Button variant="secondary" size="sm" className="ml-auto">
          Добавить задачу
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-auto">
        <DialogHeader>
          <DialogTitle>Основная Информация</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Заголовок</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Введите заголовок"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Описание</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Введите описание"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Время выполнения до</FormLabel>
                    <FormControl>
                     <Input
                        {...field}
                        disabled={isPending}
                        type="date"
                        value={
                          field.value
                            ? new Date(field.value).toISOString().split("T")[0]
                            : ""
                        }
                        ></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" variant="default" className="w-full">
              Добавить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
