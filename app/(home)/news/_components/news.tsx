"use client";
import { getNews, NewsItem } from "@/services/news-service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { SearchIcon } from "lucide-react";

interface NewsProps {
  news: NewsItem[];
}

const News = ({ news }: NewsProps) => {
  const router = useRouter();

  const handleNewsClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  return (
    <div className="flex flex-col items-center justify-center m-auto pt-16">
      <div className="w-auto">
        <ul>
          {news.map((newsItem: NewsItem) => (
            <li
              key={newsItem.id}
              onClick={() => handleNewsClick(newsItem.id)}
              className="mb-10 cursor-pointer gap-5 hover:scale-105 transition-all"
            >
              <Card className="w-96">
                <img
                  className="rounded-t-lg object-cover w-96 aspect-[16/9]"
                  height={225}
                  src={newsItem.imageUrl}
                  alt={newsItem.title}
                  width={400}
                />
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2">{newsItem.title}</h3>
                  <p className="text-gray-500 mb-4">{newsItem.name}</p>
                  <Link className="text-base hover:underline" href="#">
                    Читать
                  </Link>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      </div>
  );
};

export default News;
