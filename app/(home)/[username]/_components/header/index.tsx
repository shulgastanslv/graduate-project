import { UserAvatar } from "@/components/user-avatar";
import { VerifiedMark } from "@/components/verified-mark";
import React from "react";
import { isBlockedByUser } from "@/services/block-service";
import { isFollowingUser } from "@/services/follow-service";
import { getSelf } from "@/services/session-service";
import { getUserByUsername } from "@/services/user-service";
import { Actions } from "./actions";

interface HeaderProps {
  username: string;
  status: string;
  imageUrl: string;
}

export const Header = async ({ username, status, imageUrl }: HeaderProps) => {


  const self = await getSelf();

  const user = await getUserByUsername(username);
  const isHost = user?.id == self?.id;

  const isBlocking = await isBlockedByUser(user?.id!, self?.id!);
  const isFollowing = await isFollowingUser(user?.id!, self?.id!);

  return (
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={username}
          size="lg"
          isLive={false}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2 font-semibold text-lg">
            {username}
            <VerifiedMark />
          </div>
          <p className="text-sm opacity-50">{status}</p>
        </div>
      </div>
      <Actions
        hostIdentity={user?.id!}
        isHost={isHost}
        isFollowing={isFollowing}
        isBlocking={isBlocking}
      />
    </div>
  );
};
