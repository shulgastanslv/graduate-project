import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SelfAvatar } from "./self-avatar";
import { getSelf } from "@/services/session-service";
import Link from "next/link";
import { LogoutButton } from "./logout-button";

export async function Menu() {
  const user = await getSelf();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SelfAvatar
          size="default"
          imageUrl={user?.imageUrl!}
          username={user?.username!}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Мой Аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link href={`/settings/`}>Настройки</Link>
        </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton>Выйти</LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
