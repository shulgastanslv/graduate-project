import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";
import { Navigation } from "./navigation";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/services/recommended-service";
import { Following, FollowingSkeleton } from "./following";
import { getFollowedUsers } from "@/services/follow-service";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ShowAllToggle from "./show-all-toggle";

export const Sidebar = async () => {
  const recommended = await getRecommended();
  const following = await getFollowedUsers();

  return (
    <Wrapper>
      <Toggle />
      <Navigation />
      <div className="h-full overflow-y-scroll">
        <ShowAllToggle
          recommended={{ data: recommended }}
          following={{ data: following }}
        />
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex flex-col border-r border-border/40 w-[70px] lg:w-60 h-full bg-background shadow-md">
      <ToggleSkeleton />
      <FollowingSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};
