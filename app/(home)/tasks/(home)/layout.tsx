import { Suspense } from "react";
const TaskLayout = ({ children }: { children: React.ReactNode }) => {
  return (
  <div className="w-full h-full items-stretch justify-stretch m-auto">
  {children}
</div>)
};

export default TaskLayout;
