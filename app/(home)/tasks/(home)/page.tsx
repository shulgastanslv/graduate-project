import { CardContent, Card } from "@/components/ui/card";
import { getAllTasks } from "@/services/task-service";
import { CreateTaskModal } from "../_components/create-task-moda";
import Task, { TaskType } from "../_components/task";

const TasksPage = async () => {
  const tasks: TaskType[] = await getAllTasks();
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Задачи</h1>
        <CreateTaskModal />
      </div>
      <div className="grid gap-4">
        {tasks.length == 0 && (
          <Card className="p-5">
            <CardContent className="flex items-center justify-between pt-5">
              <p className="text-lg">У вас нет задач.</p>
            </CardContent>
          </Card>
        )}
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
