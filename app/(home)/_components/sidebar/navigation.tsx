"use client";

import { usePathname } from "next/navigation";
import {
  ActivityIcon,
  AlertCircle,
  Languages,
  NewspaperIcon,
  Palette,
  User2,
  VideoIcon,
} from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Navigation = () => {

  
  const pathname = usePathname();
  const user = useCurrentUser();

  const routes = [
    {
      label: "Управление",
      href: `/meet`,
      icon: VideoIcon,
    },
    {
      label: "Профиль",
      href: `/${user?.name}`,
      icon: User2,
    },
    {
      label: "Задачи",
      href: `/tasks`,
      icon: ActivityIcon,
    },
    {
      label: "Новости",
      href: `/news`,
      icon: NewspaperIcon,
    },
  ];

  if (!user?.id) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
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
