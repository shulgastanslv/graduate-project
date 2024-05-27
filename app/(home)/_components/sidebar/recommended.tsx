"use client";

import {User} from "@prisma/client";

import {useSidebar} from "@/store/use-sidebar";

import {UserItem, UserItemSkeleton} from "./user-item";

export interface RecommendedProps {
    data: (User & {
        meet: { isLive: boolean } | null;
    })[];
};

export const Recommended = ({
                                data,
                            }: RecommendedProps) => {
                                
    const {collapsed} = useSidebar((state) => state);

    const showLabel = !collapsed && data.length > 0;


    return (
        <div>
            {showLabel && (
                <div className="pl-6 mt-4 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Сотрудники
                    </p>
                </div>
            )}
            <ul className="space-y-2">
                {!showLabel && (
                    <div className="pl-6 mb-4">
                        <p className="text-sm text-muted-foreground">
                        </p>
                    </div>
                )}
                {data.map((user) => (
                    <UserItem
                        key={user.id}
                        username={user.username}
                        imageUrl={user.imageUrl!}
                        isLive={user.meet?.isLive}
                    />
                ))}
            </ul>
        </div>
    );
};

export const RecommendedSkeleton = () => {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i}/>
            ))}
        </ul>
    );
};