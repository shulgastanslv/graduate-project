"use client"

import {ArrowUpDown} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";

import {Button} from "@/components/ui/button";
import {UserAvatar} from "@/components/user-avatar";
import { DeleteNewsModal } from "../../_components/delete-news-dialog";
import { EditNewsModal } from "../../_components/edit-news-modal";


export type NewsInfo = {
    id: string;
    imageUrl: string;
    content : string;
    title: string;
    createdAt: string;
}

export const columnsNewsDt: ColumnDef<NewsInfo>[] = [
    {
        accessorKey: "title",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Заголовок
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
    },
    {
        accessorKey: "content",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Контент
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Дата Создания
                <ArrowUpDown className="ml-2 h-4 w-4"/>
            </Button>
        ),
    },
    {
        id: "deleteNews",
        cell: ({row}) => <DeleteNewsModal newsId={row.original.id}/>,
    },
    {
        id: "editNews",
        cell: ({row}) => <EditNewsModal newsId={row.original.id}/>,
    }
]