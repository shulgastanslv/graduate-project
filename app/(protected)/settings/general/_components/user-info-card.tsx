"use client";
import { Input } from "@/components/ui/input";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { FormError } from "@/components/form-error";
import { logout } from "@/actions/logout";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserLevel } from "@/lib/level";

interface UserInfoCard {}

interface User {
  id?: string;
  username?: string;
  bio?: string;
  level?: number;
  startedWorking?: Date;
  password?: string;
}

export const UserInfoCard = ({}: UserInfoCard) => {
  const [isPending, startTransition] = useTransition();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [level, setPosition] = useState("");
  const [startedWorking, setDataWorking] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const self = useCurrentUser();

  const save_password = () => {
    startTransition(() => {
      const user: User = { id: self?.id };
      if (password) user.password = password;
      updateUser(user)
        .then(() => {
          toast.success("Пароль изменен!");
          setError("");
          logout();
        })
        .catch(() => {
          toast.error("Что-то пошло не так!");
          setError("Что-то пошло не так!");
        });
    });
  };

  const save_handle = () => {
    startTransition(() => {
      const user: User = { id: self?.id };

      if (username) user.username = username;
      if (bio) user.bio = bio;
      if (level) {
        if (level == "Junior") {
          user.level = UserLevel.Junior;
        }

        if (level == "Middle") {
          user.level = UserLevel.Middle;
        }

        if (level == "Senior") {
          user.level = UserLevel.Senior;
        }
      }
      if (startedWorking) user.startedWorking = new Date(startedWorking);

      if (password) user.password = password;

      updateUser(user)
        .then(() => {
          toast.success("Настройки пользователя были обновлены!");
          setError("");
          logout();
        })
        .catch(() => {
          toast.error("Что-то пошло не так!");
          setError("Что-то пошло не так!");
        });
    });
  };

  return (
    <>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-base">Общие</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 p-6 w-full">
          <div className="space-y-2">
            <Input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              disabled={isPending}
              className="w-1/2"
              id="username"
              placeholder="Введите имя"
            />
          </div>
          <div className="space-y-2">
            <Textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              disabled={isPending}
              className="min-h-[100px] w-1/2"
              id="bio"
              placeholder="Введите биографию"
            />
          </div>
          <div className="space-y-2">
            <Select onValueChange={setPosition}>
              <SelectTrigger>
                <SelectValue placeholder="Позиция" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Middle">Middle</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Input
              onChange={(e) => setDataWorking(e.target.value)}
              value={startedWorking}
              type="date"
              disabled={isPending}
              className="w-1/2"
              id="dataWorking"
              placeholder="Дата начала работы"
            />
          </div>
          <div className="flex items-end justify-center">
            <FormError message={error} />
            <Button
              disabled={isPending}
              onClick={save_handle}
              type="submit"
              size="sm"
              variant="default"
              className="ml-auto"
            >
              Сохранить
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-base">Безопасность</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4 p-6 w-full">
          <div className="space-y-2">
            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              disabled={isPending}
              className="w-1/2"
              id="password"
              placeholder="Введите новый пароль"
            />
          </div>
          <div className="flex items-end justify-center">
            <FormError message={error} />
            <Button
              disabled={isPending}
              onClick={save_password}
              type="submit"
              size="sm"
              variant="default"
              className="ml-auto"
            >
              Сохранить
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
