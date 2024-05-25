"use client"
import React from 'react';
import { VideoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface MeetItemProps {
  roomId: string;
  title: string;
  time: string;
}

const MeetItem: React.FC<MeetItemProps> = ({ roomId, title, time}) => {

  const router = useRouter()

  function toMeet() {
      router.push(`/rooms/${roomId}`)
  }

  return (
    <div className="flex items-center gap-4">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full`}>
        <VideoIcon className={`h-6 w-6`} />
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