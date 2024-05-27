import { getNews, NewsItem } from "@/services/news-service";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import News from "../_components/news";
import Link from "next/link";

const NewsPage = async () => {
  
  const news: NewsItem[] = await getNews();

  return (
    <>
      {news.length > 0 ? (
          <News news={news} />
      ) : (
        <div className="w-full h-full flex flex-col gap-5 items-center text-muted-foreground justify-center">
          <p>Новостей не найдено 😕</p>
          <Button variant="secondary" asChild>
            <Link href="/">Домой</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default NewsPage;
