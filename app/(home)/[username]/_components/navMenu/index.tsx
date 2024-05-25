"use client"
import {Tab} from '@headlessui/react'
import {cn} from "@/lib/utils";
import {useCurrentUser} from '@/hooks/use-current-user';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import React from "react";

interface NavMenuProps {
    username: string;
}

export const NavMenu = ({username}: NavMenuProps) => {

    const routes = [
        {
            name: "Главная",
            href: `/${username}`,
            icon: null,
        },
        {
            name: "Подробнее",
            href: `${username}/about`,
            icon: null,
        },
    ];

    return (
        <div className="w-min items-center">
            <Tab.Group as="div" className="mt-2">
                <Tab.List className="-mb-px flex space-x-8">
                    {routes.map((i) => (
                        <Link key={i.name} href={i.href}>
                            <Tab
                                key={i.name}
                                className={({selected}) =>
                                    cn(
                                        selected ? 'border-current text-current' : 'border-transparent text-gray-400',
                                        'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                                    )
                                }>
                                <div className="flex items-center">
                                    <span>{i.name}</span>
                                </div>
                            </Tab>
                        </Link>
                    ))}
                </Tab.List>
            </Tab.Group>
        </div>
    );
}