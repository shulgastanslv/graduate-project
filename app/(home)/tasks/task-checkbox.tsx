import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { TaskStatus } from "@/lib/status";
import { completeTask, unCompleteTask } from "@/actions/task";

interface TaskCheckboxProps {
  taskId: string;
  initialStatus: number;
}

const TaskCheckbox: React.FC<TaskCheckboxProps> = ({
  taskId,
  initialStatus,
}) => {
  const [isChecked, setIsChecked] = useState(
    initialStatus === TaskStatus.Complete
  );

  const handleChange = async () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    const url = newChecked ? "/api/complete_task" : "/api/uncomplete_task";
    const id = taskId
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });

    if (!response.ok) {
      console.error("Failed to update task status");
      setIsChecked(!newChecked); // Revert the change if the request fails
    }
  };

  return (
    <input
      id="default-checkbox"
      type="checkbox"
      value=""
      className="w-4 h-4 text-white-600 bg-gray-100 border-gray-300 rounded focus:ring-black dark:focus:ring-black dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      checked={isChecked}
      onChange={handleChange}
    />
  );
};

export default TaskCheckbox;
