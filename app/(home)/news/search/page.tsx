import { Button } from "@/components/ui/button";
import News from "../_components/news";
import Link from "next/link";
import { NewsItem } from "@/services/news-service";
import { getNewsByTerm } from "@/services/search-service";

interface ResultsProps {
    searchParams: {
      term?: string;
    };
  }
  
  const SearchNews= async ({ searchParams }: ResultsProps) => {

    const news: NewsItem[] = await getNewsByTerm(searchParams.term);

  return (
    <>
      {news.length > 0 ? (
          <News news={news} />
      ) : (
        <div className="w-full h-full flex flex-col gap-5 items-center text-muted-foreground justify-center">
          <p>Новостей не найдено 😕</p>
          <Button variant="secondary" asChild>
            <Link href="/news">Назад</Link>
          </Button>
        </div>
      )}
    </>
  );
}
 
export default SearchNews;