import Link from "next/link";

import {Button} from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-4xl">404</h1>
            <Button variant="secondary" asChild>
                <Link href="/">
                    Домой
                </Link>
            </Button>
        </div>
    );
};

export default NotFoundPage;