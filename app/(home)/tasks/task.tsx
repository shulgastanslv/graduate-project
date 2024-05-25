"use client"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CardContent, Card } from '@/components/ui/card';
import { EditIcon } from 'lucide-react';
import { DeleteTaskModal } from './delete-modal';
import { EditTaskModal } from './edit-task-modal';
import TaskCheckbox from './task-checkbox';

export interface TaskType {
  id? : string;
  title : string;
  description : string | null;
  startTime? : Date | null;
  endTime? : Date | null;
  timeSpent? : number | null;
  status: number | null;
}

interface TaskProps {
  task: TaskType; 
}

const Task: React.FC<TaskProps> = ({ task }) => {

  return (
    <Card className="p-5">
      <CardContent className="flex items-center justify-between pt-5">
        <div className="flex items-center gap-4">
            <TaskCheckbox taskId={task.id!} initialStatus={task.status!} />
          <div>
            <h3 className="font-medium">{task.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{task.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
            {"до"} {task?.endTime!.toLocaleDateString()!}
        </div>
        <div className="flex items-center gap-2">
          <EditTaskModal taskId={task.id!}/>
          <DeleteTaskModal taskId={task.id!} />
        </div>
      </CardContent>
    </Card>
  );
};

  
export default Task;
