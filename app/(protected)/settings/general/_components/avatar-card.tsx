"use client";

import {Input} from "@/components/ui/input";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {updateUser, updateImageUrl} from "@/actions/user";
import {toast} from "sonner";
import {useState, useTransition} from "react";
import {useCurrentUser} from "@/hooks/use-current-user";
import {FormError} from "@/components/form-error";

interface UrlCardProps {
};

export const AvatarCard = ({}: UrlCardProps) => {

    const user = useCurrentUser();
    const [isPending, startTransition] = useTransition();
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState("");

    const delete_avatar_handle = () => {
        startTransition(() => {
            updateImageUrl("")
                .then(() => {
                    toast.success("Аватар удален!");
                    setError("");
                })
                .catch(() => {
                    toast.error("Что-то пошло не так!");
                    setError("Что-то пошло не так!");
                });
        });
    }

    const save_handle = () => {
        if (!imageUrl) {
            setError("URL пуст");
            return;
        }
        startTransition(() => {
            updateImageUrl(imageUrl)
                .then(() => {
                    toast.success("Аватар был обновлен!");
                    setError("");
                })
                .catch(() => {
                    toast.error("Что-то пошло не так!");
                    setError("Что-то пошло не так!");
                });
        });
    }

    return (
        <Card className="bg-transparent">
            <CardHeader>
                <CardTitle className="text-base">Аватар</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 p-6">
                <div className="space-y-4 w-1/2">
                    <Input id="url"
                           onChange={(e) => setImageUrl(e.target.value)}
                           value={imageUrl}
                           disabled={isPending}
                           placeholder="Ваш URL"/>
                </div>
                <FormError message={error}/>
                <div className="flex items-end justify-center">
                    <div className="flex items-start space-x-4">
                        <div className="space-x-2">
                            <Button size="sm" variant="destructive"
                                    onClick={delete_avatar_handle}>
                                <TrashIcon className="mr-1.5 h-4 w-4"/>
                                Удалить аватар
                            </Button>
                        </div>
                    </div>
                    <Button disabled={isPending}
                            onClick={save_handle}
                            type="submit" size="sm" variant="default"
                            className="ml-auto">Сохранить</Button>
                </div>
            </CardContent>
        </Card>
    );
};