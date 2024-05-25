"use client";

import {toast} from "sonner";
import {ElementRef, useRef, useState, useTransition} from "react";

import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import {updateUser} from "@/actions/user";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";

interface AboutModalProps {
    initialValue: string | null;
};

export const AboutModal = ({
                             initialValue,
                         }: AboutModalProps) => {

                            
    const closeRef = useRef<ElementRef<"button">>(null);

    const [isPending, startTransition] = useTransition();
    const [value, setValue] = useState(initialValue || "");

    const user = useCurrentUser()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateUser({id: user?.id, bio: value})
                .then(() => {
                    toast.success("Биография пользователя была обновлена!");
                    closeRef.current?.click();
                })
                .catch(() => toast.error("Что-то пошло не так!"));
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Изменить
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Основная информация</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Textarea
                        placeholder="Биография"
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        disabled={isPending}
                        className="resize-none"
                    />
                    <div className="flex justify-between">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="ghost">
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button
                            disabled={isPending}
                            type="submit"
                            variant="default"
                        >
                            Сохранить
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};