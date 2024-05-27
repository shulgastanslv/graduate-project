"use client"

import {ArrowUpDown} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {UserAvatar} from "@/components/user-avatar";
import {EditUserModal} from "./edit-button-dialog";
import { SendUserModal } from "./send-item-dialog";
import {DeleteUserModal} from "@/app/(protected)/settings/admin/_components/delete-user-dialog";


export type UserInfo = {
    id: string;
    username: string;
    password: string | null;
    level: number | null;
    role: number;
    status: number | null;
    imageUrl: string | null;
    bio: string | null;
    lastLogin: Date | null;
    startedWorking: Date | null;
    workExperience: number | null;
    createdAt: string;
    updatedAt: Date;
}

export const columnsUsersDt: ColumnDef<UserInfo>[] = [
    {
        accessorKey: "username",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Имя
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
        cell: ({row}) => (
            <div className="flex items-center gap-x-4">
                <UserAvatar
                    username={row.original.username}
                    imageUrl={row.original.imageUrl!}
                />
                <span>{row.original.username}</span>
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Дата создания
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
    },
    {
        id: "editUser",
        cell: ({row}) => <EditUserModal userId={row.original.id!}/>,
    },
    {
        id: "sendItem",
        cell: ({row}) => <SendUserModal userId={row.original.id}/>,
    },
    {
        id: "deleteUser",
        cell: ({row}) => <DeleteUserModal userId={row.original.id}/>,
    }
]