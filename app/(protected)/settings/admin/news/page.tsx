import { getNews } from "@/services/news-service";
import { format } from "util";
import { columnsNewsDt } from "./_components/columns-news-dt";
import { NewsDataTable } from "./_components/news-data-table";

const NewsAdminPage = async () => {
  
  const news = await getNews();

  const formatDate = (format: Date) => {
    const yyyy = format.getFullYear();
    const mm = String(format.getMonth() + 1).padStart(2, "0");
    const dd = String(format.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const formattedDataUsers = news.map((newsItem) => ({
    id: newsItem.id,
    imageUrl: newsItem.imageUrl,
    content: newsItem.content,
    title: newsItem.title,
    createdAt: formatDate(newsItem.createdAt),
  }));

  return (
    <div className="w-full h-full items-stretch justify-stretch m-10">
      <NewsDataTable columns={columnsNewsDt} data={formattedDataUsers} />
    </div>
  );
};

export default NewsAdminPage;
