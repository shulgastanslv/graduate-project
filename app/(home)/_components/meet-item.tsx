"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface MeetItemProps {
  roomId: string;
  title: string;
  time: string;
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


const MeetItem: React.FC<MeetItemProps> = ({ roomId, title, time}) => {

  const router = useRouter()

  function toMeet() {
      router.push(`/rooms/room/?name=${roomId}`)
  }

  return (
    <div className="flex items-center gap-4 h-full overflow-y-visible">
      <div className={`flex h-20 w-20 items-center justify-center rounded-full`}>
        <VideoIcon />
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{time}</div>
      </div>
      <Button className="ml-auto" size="sm" variant="outline" onClick={toMeet}>
        Войти
      </Button>
    </div>
  );
};

export default MeetItem;