import Link from "next/link";
import {User} from "@prisma/client";

import {Thumbnail, ThumbnailSkeleton} from "@/components/thumbnail";
import {Skeleton} from "@/components/ui/skeleton";
import {VerifiedMark} from "@/components/verified-mark";

interface ResultCardProps {
    data: {
        id: string;
        username : string,
        imageUrl : string | null,
        updatedAt : Date;
    };
};

export const ResultCard = ({
                               data,
                           }: ResultCardProps) => {
    return (
        <Link href={`/${data.username}`}>
            <div className="w-full flex gap-x-4">
                <div className="relative h-[9rem] w-[16rem]">
                    <Thumbnail
                        src={data.imageUrl}
                        fallback={data.imageUrl!}
                        username={data.username}
                    />
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-x-2">
                        <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
                            {data.username}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export const ResultCardSkeleton = () => {
    return (
        <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
                <ThumbnailSkeleton/>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-32"/>
                <Skeleton className="h-3 w-24"/>
                <Skeleton className="h-3 w-12"/>
            </div>
        </div>
    );
};