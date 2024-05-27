import { Suspense } from "react";
const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
  <div className="w-full h-full items-stretch justify-stretch m-auto overflow-visible">
  {children}
</div>)
};

export default RoomLayout;
