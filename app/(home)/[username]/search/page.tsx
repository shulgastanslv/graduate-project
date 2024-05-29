import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllItemsByTerm, getAllTasksByTerm } from "@/services/search-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ItemCard from "../(home)/_components/item-card";
import { getSelf } from "@/services/session-service";

interface ResultsProps {
  searchParams: {
    term?: string;
  };
}

const SearchItems = async ({ searchParams }: ResultsProps) => {
 
  const self = await getSelf()
  const items = await getAllItemsByTerm(searchParams.term);

  const url = "\\" + self?.username!
  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-4">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full gap-4">
              <p className="text-muted-foreground text-sm">
                Нет результатов. Попробуйте найти что-то еще!
              </p>
              <Button variant="secondary">
                <Link href={url}>Отмена</Link>
              </Button>
            </div>
          )}
          {items.map((item) => (
             <ItemCard key={item.id} item={item}/>
          ))}
        </div>
      </div>
      {items.length != 0 && (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <Button variant="secondary">
            <Link href={url}>Назад</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchItems;
