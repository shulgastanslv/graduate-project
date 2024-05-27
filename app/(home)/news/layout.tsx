import { Suspense } from "react";

const RootNewsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center m-auto pt-16">
      {children}
    </div>
  ); 
};

export default RootNewsLayout;
