import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";
import {Avatar, AvatarFallback, AvatarImage,} from "@/components/ui/avatar";

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-9 w-9",
                lg: "h-14 w-14",
            },
        },
        defaultVariants: {
            size: "default",
        },
    },
);

interface SelfAvatarProps
    extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
};

export const SelfAvatar = ({
                               username,
                               size,
                               imageUrl,
                           }: SelfAvatarProps) => {

    return (
        <div className="relative">
            <Avatar
                className={cn(
                    "hover:cursor-pointer",
                    avatarSizes({size})
                )}
            >
                <AvatarImage src={imageUrl} className="object-cover"/>
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
        </div>
    );
};

interface UserAvatarSkeletonProps
    extends VariantProps<typeof avatarSizes> {
};

export const UserAvatarSkeleton = ({
                                       size,
                                   }: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn(
            "rounded-full",
            avatarSizes({size}),
        )}/>
    );
};