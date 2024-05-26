import React, { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  getAllUsersByLevel,
  getAllUsersByStatus,
  getAllUsersWithWorkingThanThreeYears,
  getAllUsersWithWorkingTimeLessThanYear,
  getAllUsersWithWorkingTimeoneToThreeYears,
} from "@/services/user-service";
import { UserStatus } from "@/lib/status";
import { UserLevel } from "@/lib/level";
import {
  getTaskComplete,
  getTasksDays,
  getTasksHours,
} from "@/services/task-service";
import { currentUser, getSelf } from "@/services/session-service";
import { useCurrentUser } from "@/hooks/use-current-user";
import { getAllMeets } from "@/services/meet-service";
import MeetItem from "./_components/meet-item";

export default async function Home() {
  const user = await getSelf();
  const onlineUsers = await getAllUsersByStatus(UserStatus.Online);
  const awayUsers = await getAllUsersByStatus(UserStatus.Away);
  const oflineUsers = await getAllUsersByStatus(UserStatus.Offline);

  const lessThanYearUsers = await getAllUsersWithWorkingTimeLessThanYear();
  const oneToThreeYearsUsers =
    await getAllUsersWithWorkingTimeoneToThreeYears();
  const moreThanThreeYearsUsers = await getAllUsersWithWorkingThanThreeYears();

  const juniors = await getAllUsersByLevel(UserLevel.Junior);
  const middle = await getAllUsersByLevel(UserLevel.Middle);
  const seniors = await getAllUsersByLevel(UserLevel.Senior);

  const taskComplete = await getTaskComplete(user?.id!);
  const days = await getTasksDays(user?.id!);

  const meets = await getAllMeets();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid bg-transparent grid-cols-3 gap-5">
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Пользователи</CardTitle>
            <CardDescription>Текущие статусы пользователей</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <UserIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-sm font-medium">Онлайн</div>
                <div className="text-2xl font-bold">{onlineUsers.length}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                  <UserIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-sm font-medium">Отошёл</div>
                <div className="text-2xl font-bold">{awayUsers.length}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <UserIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="text-sm font-medium">Офлайн</div>
                <div className="text-2xl font-bold">{oflineUsers.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-transparent">
          <CardHeader className="pb-4">
            <CardTitle>Уровни разработчиков</CardTitle>
            <CardDescription>
              Оцените уровень опыта членов вашей компании
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <UserIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-sm font-medium">Junior</div>
                <div className="text-2xl font-bold">{juniors.length}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                  <UserIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-sm font-medium">Middle</div>
                <div className="text-2xl font-bold">{middle.length}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <UserIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="text-sm font-medium">Senior</div>
                <div className="text-2xl font-bold">{seniors.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-transparent">
          <CardHeader className="pb-4">
            <CardTitle>Срок пребывания в компании</CardTitle>
            <CardDescription>
              Просмотр стажа работы членов вашей компании
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <ClockIcon className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-sm font-medium">Меньше 1 года</div>
                <div className="text-2xl font-bold">
                  {lessThanYearUsers.length}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                  <ClockIcon className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-sm font-medium">1-3 года</div>
                <div className="text-2xl font-bold">
                  {oneToThreeYearsUsers.length}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                  <ClockIcon className="h-6 w-6 text-red-500" />
                </div>
                <div className="text-sm font-medium">Больше 3 лет</div>
                <div className="text-2xl font-bold">
                  {moreThanThreeYearsUsers.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-transparent">
          <CardHeader>
            <CardTitle>Продуктивность</CardTitle>
            <CardDescription>Отслеживайте свою продуктивность</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                  <ActivityIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="text-sm font-medium">Выполнено задач</div>
                <div className="text-2xl font-bold">{taskComplete.length}</div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                  <ClockIcon className="h-6 w-6 text-purple-500" />
                </div>
                <div className="text-sm font-medium">Затрачено</div>
                <div className="text-2xl font-bold">{days} дн</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-transparent shadow-none">
          <CardContent>
            <div className="grid grid-cols-1 gap-4 items-center justify-center">
              {meets.map((meeting, index) => (
                <MeetItem
                  key={index}
                  roomId={meeting.roomId!}
                  title={meeting.user.username}
                  time={meeting.startTime?.toLocaleString()!}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

function ActivityIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function BellIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function ClockIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ContactIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <circle cx="12" cy="10" r="2" />
      <line x1="8" x2="8" y1="2" y2="4" />
      <line x1="16" x2="16" y1="2" y2="4" />
    </svg>
  );
}

function FileIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function HomeIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MaximizeIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function MicIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function NewspaperIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  );
}

function Package2Icon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function SearchIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ShareIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function UserIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function VideoIcon(
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  );
}
