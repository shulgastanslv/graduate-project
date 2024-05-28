import { Suspense } from "react";
const MeetLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full items-center justify-center m-0">
      {children}
    </div>
  );
};

export default MeetLayout;
