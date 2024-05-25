import Link from "next/link";

import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";

export const Actions = async () => {

    return (

        <div className="flex items-center justify-center gap-x-2 ml-4 lg:ml-0">
            <Button
                size="sm"
                variant="ghost"
                className="text-muted-foreground hover:text-primary"
                asChild
            >
                <Link href="/">
                    <LogOut className="h-5 w-5 mr-2"/>
                    Выход
                </Link>
            </Button>
        </div>
    );
};