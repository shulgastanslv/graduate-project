import {getNews, NewsItem, getNewsById} from "@/services/news-service";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import ReactMarkdown from 'react-markdown';
import Link from "next/link";

interface NewsItemProps {
    params: {
        id: string;
    };
};


const NewsItemPage = async ({params} : NewsItemProps) => {

    const item  = await getNewsById(params.id);

    return (
        <div className="w-1/3 h-full items-center justify-center m-auto pt-5">
            <div className="px-4 py-6 md:px-6 lg:py-12">
                <article className="space-y-4 prose prose-gray prose-lg mx-auto dark:prose-invert">
                    <div className="space-y-2 not-prose">
                    <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                        {item?.title}
                    </h1>
                        <div className="space-y-1 text-gray-500 dark:text-gray-400">
                            <p className="text-sm text-gray-500">
                                {new Date(item?.updatedAt!).toLocaleDateString()}
                            </p>
                            <p>{item?.name}</p>
                        </div>
                    </div>
                    <Image
                        alt="Cover image"
                        className="aspect-video overflow-hidden rounded-lg object-cover"
                        height={450}
                        src={item?.imageUrl!}
                        width={1100}
                    />
                    <ReactMarkdown>
                        {item?.content}
                    </ReactMarkdown>
                </article>
                <div className="items-center justify-center m-auto pt-5">
                    <Button variant="secondary" asChild>
                        <Link href="/news">
                            Назад
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NewsItemPage;