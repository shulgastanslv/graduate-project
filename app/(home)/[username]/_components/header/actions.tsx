"use client";

import {toast} from "sonner";
import {Heart, MinusCircle} from "lucide-react";
import {useTransition} from "react";
import {useRouter} from "next/navigation";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Skeleton} from "@/components/ui/skeleton";
import {onFollow, onUnfollow} from "@/actions/follow";
import {onBlock, onUnblock} from "@/actions/block";
import {useCurrentUser} from "@/hooks/use-current-user";

interface ActionsProps {
    hostIdentity: string;
    isBlocking: boolean;
    isFollowing: boolean;
    isHost: boolean;
};

export const Actions = ({
                            hostIdentity,
                            isBlocking,
                            isFollowing,
                            isHost,
                        }: ActionsProps) => {
                            
    const [isPending, startTransition] = useTransition();

    const router = useRouter();
    const userId = useCurrentUser()?.id;

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data: { following: { username: string; }; }) => toast.success(`Вы отслеживайте ${data.following.username}`))
                .catch(() => toast.error("Что-то пошло не так!"))
        });
    }

    const handleUnfollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data: { following: { username: string; }; }) => toast.success(`Вы перестали отслеживать ${data.following.username}`))
                .catch(() => toast.error("Что то пошло не так!"))
        });
    }

    const toggleFollow = () => {

        if (isHost) return;

        if (isFollowing) {
            handleUnfollow();
        } else {
            handleFollow();
        }
    }


    const handleBlock = () => {
        startTransition(() => {
            onBlock(hostIdentity)
                .then(() => toast.success(`Вы скрыли пользователя!`))
                .catch(() => toast.error("Что-то пошло не так!"))
        });
    }

    const handleUnBlock = () => {
        startTransition(() => {
            onUnblock(hostIdentity)
                .then(() => toast.success(`Теперь вы можете отслеживать пользователя!`))
                .catch(() => toast.error("Что-то пошло не так!"))
        });
    }

    const toggleBlock = () => {

        if (isHost) return;

        if (isBlocking) {
            handleUnBlock();
        } else {
            handleBlock();
        }
    }

    return (
        <div className="flex gap-2">

            <Button
                disabled={isPending || isHost}
                onClick={toggleBlock}
                variant="secondary"
                size="sm"
                className="w-full lg:w-auto"
            >
                <MinusCircle className="h-4 w-4 mr-2"/>
                {isBlocking
                    ? "Раскрыть"
                    : "Скрыть"
                }
            </Button>
            <Button
                disabled={isPending || isHost}
                onClick={toggleFollow}
                variant="secondary"
                size="sm"
                className="w-full lg:w-auto"
            >
                <Heart className={cn(
                    "h-4 w-4 mr-2",
                    isFollowing
                        ? "fill-white"
                        : "fill-none"
                )}/>
                {isFollowing
                    ? "Перестать отслеживать"
                    : "Отслеживать"
                }
            </Button>
        </div>

    )
};

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24"/>
    );
};