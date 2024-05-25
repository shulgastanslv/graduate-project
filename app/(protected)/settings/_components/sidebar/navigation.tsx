"use client"

import {usePathname} from "next/navigation";
import {AlertCircle, Languages, Palette, User2} from "lucide-react";

import {NavItem, NavItemSkeleton} from "./nav-item";
import {useCurrentUser} from "@/hooks/use-current-user";

export const Navigation = () => {

    const pathname = usePathname();

    const user = useCurrentUser();

    const isAdmin = user?.role === 1;

    const routes = [
        {
            label: "Основные",
            href: `/settings/general`,
            icon: User2
        },
        ...(isAdmin
            ? [
                {
                    label: "Админ Панель",
                    href: `/settings/admin`,
                    icon: AlertCircle,
                },
            ]
            : []),
    ];

    if (!user?.id) {
        return (
            <ul className="space-y-2">
                {[...Array(4)].map((_, i) => (
                    <NavItemSkeleton key={i}/>
                ))}
            </ul>
        );
    }

    return (
        <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route) => (
                <NavItem
                    key={route.href}
                    label={route.label}
                    icon={route.icon}
                    href={route.href}
                    isActive={pathname === route.href}
                />
            ))}
        </ul>
    );
};