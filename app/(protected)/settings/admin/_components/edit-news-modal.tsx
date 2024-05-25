"use client";

import { ElementRef, useRef, useState, useTransition } from "react";

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
import { useRouter } from "next/navigation";
import { updateUser } from "@/actions/user";
import { RegisterSchema, UpdateNewsSchema, UpdateSchema } from "@/schemas";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { UserLevel } from "@/lib/level";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateNews } from "@/actions/news";

interface EditNewsModalProps {
  newsId: string;
}

interface UpdateUserResult {
  error?: string;
  success?: string;
}

interface News {
  id?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  name?: string;
}

export const EditNewsModal = ({ newsId }: EditNewsModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateNewsSchema>>({
    resolver: zodResolver(UpdateNewsSchema),
    defaultValues: {
      id: newsId,
      title: "",
      content: "",
      imageUrl: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UpdateNewsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      const news: News = { id: values.id! };

      if (values.title) news.title = values.title!;
      if (values.content) news.content = values.content!;
      if (values.imageUrl) news.imageUrl = values.imageUrl!;
      if (values.name) news.name = values.name!;

      updateNews(news)
        .then(() => {
          toast.success("Новости были обновлены!");
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
        <Button variant="ghost" size="sm" className="ml-auto">
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение данных новостей</DialogTitle>
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
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cодержимое</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url Изображения</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Автор</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Изменить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
