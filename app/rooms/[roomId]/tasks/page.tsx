"use client";
import TaskCard from "@/components/TaskCard";
import AddTaskDialog from "@/components/TaskDialog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

const page = ({ params }: { params: { roomId: string } }) => {
  const { roomId } = params;
  const roomSlug = roomId.split("-").join(" ");
  const taskslist: Task[] = [
    {
      id: 0,
      title: "Dust the shelves",
      description: "Wipe down all shelves and surfaces with a microfiber cloth",
      priority: "Medium",
    },
    {
      id: 1,
      title: "Mop the floors",
      description:
        "Use a wet mop to clean all floors, ensuring no spots are missed",
      priority: "High",
    },
  ];

  const [tasks, setTasks] = useState(taskslist);
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false); // Control dialog

  const addTask = (newTask: Task) => {
    if (isEditing && taskToEdit) {
      setTasks(
        tasks.map((task) =>
          task.id === taskToEdit.id ? { ...newTask, id: task.id } : task
        )
      );
      setIsEditing(false);
      setTaskToEdit(null);
    } else {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsEditing(true);
    setDialogOpen(true); // Open dialog on edit
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId)); // Filter out the task to be deleted
  };

  return (
    <div className="max-container padding-container flex flex-col gap-4 mb-8">
      <nav className=" sticky top-0.5 z-10 bg-white shadow-md container mx-auto px-4 py-4">
        <div className="flex justify-between">
          <Link
            href="/rooms"
            className="flex items-center text-primary max-w-[150px] hover:text-primary-100 hover:underline hover:underline-offset-2 duration-150 transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Rooms
          </Link>

          <AddTaskDialog
            onAddTask={addTask}
            task={taskToEdit}
            open={dialogOpen}
            setOpen={setDialogOpen}
          />
        </div>
      </nav>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            onEdit={() => handleEditTask(task)} // Trigger edit
            onDelete={() => handleDeleteTask(task.id)} // Trigger delete
          />
        ))}
      </div>
    </div>
  );
};

export default page;
