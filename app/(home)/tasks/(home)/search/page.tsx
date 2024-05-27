import { Card, CardContent } from "@/components/ui/card";
import Task from "../../_components/task";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllTasksByTerm } from "@/services/search-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ResultsProps {
  searchParams: {
    term?: string;
  };
}

const SearchTasks = async ({ searchParams }: ResultsProps) => {
  const tasks = await getAllTasksByTerm(searchParams.term);

  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-4">
          <p className="text-lg">
            Результаты по теме &quot;{searchParams.term}&quot;
          </p>
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center w-full gap-4">
              <p className="text-muted-foreground text-sm">
                Нет результатов. Попробуйте найти что-то еще!
              </p>
              <Button variant="secondary">
                <Link href="/tasks">Назад</Link>
              </Button>
            </div>
          )}
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
      {tasks.length != 0 && (
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <Button variant="secondary">
            <Link href="/tasks">Назад</Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default SearchTasks;
