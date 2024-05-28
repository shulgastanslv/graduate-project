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
import { toast } from "sonner";
import { ItemScheme } from "@/schemas";
import { POST } from "@/app/api/items/route";
import { Edit, PartyPopper, Send } from "lucide-react";
import { sendItem } from "@/actions/item";
import { useRouter } from "next/navigation";

interface SendItemModalProps {
  userId: string;
}

export const SendUserModal = ({ userId }: SendItemModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ItemScheme>>({
    resolver: zodResolver(ItemScheme),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ItemScheme>) => {
    startTransition(() => {
      const item = {
        name: values?.name,
        description: values?.description,
        imageUrl: values?.imageUrl,
        userId: userId,
      };
      sendItem(item).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        router.refresh();
      });
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          <PartyPopper className="opacity-50 w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Основная информация</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isPending} />
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
                    <FormLabel>URL</FormLabel>
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
              Отправить
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
