import { notFound } from "next/navigation";
import { getUserByUsername } from "@/services/user-service";
import { UserBanner } from "./_components/banner";
import { NavMenu } from "./_components/navMenu";
import { Header } from "./_components/header";
import React, { ReactNode } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { isBlockedByUser } from "@/services/block-service";
import { isFollowingUser } from "@/services/follow-service";
import { getSelf } from "@/services/session-service";
import { UserStatus } from "@/lib/status";
import { Search } from "./(home)/_components/search";

interface UserLayoutProps {
  username: string;
}

interface UserLayoutContainerProps {
  children: ReactNode;
  params: UserLayoutProps;
}

export default async function UserLayout({
  children,
  params,
}: UserLayoutContainerProps) {
  const user = await getUserByUsername(params.username)!;

  let status;

  if (user?.status == 0) {
    status = "Онлайн";
  }

  if (user?.status == 1) {
    status = "Был в сети недавно";
  }

  if (user?.status == 2) {
    status = "Офлайн";
  }

  return (
    <div>
      <UserBanner imageUrl={user?.imageUrl!} username={user?.username!} />
      <div className="flex flex-col h-screen z-10">
        <div className="pt-5 px-5 bg-background">
          <Header
            username={user?.username!}
            status={status!}
            imageUrl={user?.imageUrl!}
          />
          <NavMenu username={user?.username!} />
          <div className="mt-5">
            <Search />
          </div>
          <div className="pt-5">
            {React.Children.map(children, (child) =>
              React.cloneElement(child as React.ReactElement, {
                username: params.username,
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
