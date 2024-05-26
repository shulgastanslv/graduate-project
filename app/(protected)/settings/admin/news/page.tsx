import { getNews } from "@/services/news-service";
import { format } from "util";
import { columnsNewsDt } from "./_components/columns-news-dt";
import { NewsDataTable } from "./_components/news-data-table";

const NewsAdminPage = async () => {
  const news = await getNews();

  const formattedDataUsers = news.map((newsItem) => ({
    ...newsItem,
    id: newsItem.id,
    imageUrl: newsItem.imageUrl,
    content: newsItem.content,
    title: newsItem.title,
    createdAt: format(new Date(newsItem.createdAt), "dd/MM/yyyy"),
  }));

  return (
    <div>
      <div className="flex flex-col p-6 w-full">
        <NewsDataTable columns={columnsNewsDt} data={formattedDataUsers} />
      </div>
    </div>
  );
};

export default NewsAdminPage;
