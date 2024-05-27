"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button"; // Предположим, у вас есть компонент кнопки
import { Following } from "./following";
import { Recommended } from "./recommended";
import { Follow, User } from "@prisma/client";
import { useSidebar } from "@/store/use-sidebar";

// Интерфейсы для пропсов
interface FollowingProps {
  data: (Follow & {
    following: User & {
      meet: { isLive: boolean } | null;
    };
  })[];
}

interface RecommendedProps {
  data: (User & {
    meet: { isLive: boolean } | null;
  })[];
}

// Сам компонент ShowAllToggle
const ShowAllToggle: FC<{
  recommended: RecommendedProps;
  following: FollowingProps;
}> = ({ recommended, following }) => {
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [showAllFollowing, setShowAllFollowing] = useState(false);
  
  const {collapsed} = useSidebar((state) => state);
  const showLabel = !collapsed;

  const toggleShowAllRecommended = () =>
    setShowAllRecommended(!showAllRecommended);
  const toggleShowAllFollowing = () => setShowAllFollowing(!showAllFollowing);

  return (
    <div className="h-full overflow-y-scroll">
      <Recommended
        data={
          showAllRecommended ? recommended.data : recommended.data.slice(0, 5)
        }
      />
      {recommended.data.length > 5 && showLabel && (
        <div className="pl-6 mt-4 mb-4 flex flex-col items-start justify-start w-full">
          <Button variant="ghost" onClick={toggleShowAllRecommended}>
            {showAllRecommended ? "Скрыть" : "Показать всех"}
          </Button>
        </div>
      )}
      <Following
        data={showAllFollowing ? following.data : following.data.slice(0, 5)}
      />
      {following.data.length > 5 && (
        <div className="pl-6 mt-4 mb-4 flex flex-col items-start justify-start w-full">
          <Button variant="ghost" onClick={toggleShowAllFollowing}>
            {showAllFollowing ? "Скрыть" : "Показать всех"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ShowAllToggle;
