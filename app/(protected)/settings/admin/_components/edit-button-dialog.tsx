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
import { RegisterSchema, UpdateSchema } from "@/schemas";
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

  
interface EditUserModalProps {
  userId: string;
}

interface UpdateUserResult {
  error?: string;
  success?: string;
}

interface User {
  id?: string;
  username?: string;
  password?: string;
  level?: number;
  startedWorking?: Date;
}

export const EditUserModal = ({ userId }: EditUserModalProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      id: userId,
      password: "",
      username: "",
      level: "",
      startedWorking: "",
    },
  });


  const onSubmit = (values: z.infer<typeof UpdateSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {

      const user : User = {id : values.id!}

      if (values.username) user.username = values.username!;

      if (values.level) {
        if (values.level == "Junior") {
          user.level = UserLevel.Junior;
        }

        if (values.level == "Middle") {
          user.level = UserLevel.Middle;
        }

        if (values.level == "Senior") {
          user.level = UserLevel.Senior;
        }
      }
      if (values.startedWorking) user.startedWorking = new Date(values.startedWorking);

      if (values.password) user.password = values.password;

      updateUser(user)
        .then(() => {
          toast.success("Настройки пользователя были обновлены!");
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
          <DialogTitle>Изменение данных пользователя</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
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
                name="password"
                render={({ field }) => (
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
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="level"
                rules={{ required: "Выберите позицию!" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Позиция</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Позиция" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Junior">Junior</SelectItem>
                          <SelectItem value="Middle">Middle</SelectItem>
                          <SelectItem value="Senior">Senior</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startedWorking"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата начала работы</FormLabel>
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
                      />
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
