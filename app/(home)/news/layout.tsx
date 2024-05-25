import { Suspense } from "react";

const NewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full">
      {children}
    </div>
  );
};

export default NewsLayout;
