import { Suspense } from "react";
import { redirect } from "next/navigation";

import { Results, ResultsSkeleton } from "./_components/results";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.term) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultsSkeleton />}>
        <Results term={searchParams.term} />
      </Suspense>
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <Button variant="secondary">
          <Link href="/">Назад</Link>
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
