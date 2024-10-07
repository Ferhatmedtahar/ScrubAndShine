"use client";
import ConfirmDeleteTask from "@/components/ConfirmDeleteTask";
import TaskCard from "@/components/TaskCard";
import AddTaskDialog from "@/components/TaskDialog";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
};

const page = ({ params }: { params: { roomId: string } }) => {
  const { roomId } = params;
  const roomSlug = roomId.split("-").join(" ");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Vacuum the floor",
      description:
        "Use the vacuum cleaner to clean the carpet and hard floors. Pay special attention to corners and under furniture.",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      title: "Dust the shelves",
      description:
        "Wipe down all shelves and surfaces with a microfiber cloth. Don't forget to dust picture frames and decorative items.",
      priority: "Medium",
      completed: true,
    },
    {
      id: 3,
      title: "Water the plants",
      description:
        "Check and water all indoor plants as needed. Remove any dead leaves and check for signs of pests.",
      priority: "Low",
      completed: false,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false); // Control dialog
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    if (!dialogOpen) {
      setIsEditing(false);
      setTaskToEdit(null); // Clear the room to edit
      setDialogOpen(false); // Close the dialog
    }
  }, [dialogOpen]);
  const resetAllTasks = () => {
    setTasks(tasks.map((task) => ({ ...task, completed: false })));
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
  const DeleteTask = (task: Task) => {
    setTaskToDelete(task); // Open delete confirmation dialog by setting the room
  };

  const handleDeleteTask = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((room) => room.id !== taskToDelete.id));
      setTaskToDelete(null);
    }
  };

  return (
    <div className="max-container padding-container flex flex-col gap-4 mb-8">
      <nav className=" sticky top-0.5 z-10 bg-white shadow-md container mx-auto px-4 py-4">
        <Link
          href="/rooms"
          className="flex items-center text-primary max-w-[150px] hover:text-primary-100 hover:underline hover:underline-offset-2 duration-150 transition-all"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Rooms
        </Link>
      </nav>

      <div className="flex sm:justify-between items-center flex-col sm:flex-row gap-8 ">
        <h1 className="text-2xl lg:text-3xl font-semibold blue-gradient">
          {roomSlug} Tasks
        </h1>
        <div className="flex gap-4 flex-col sm:flex-row max-w-120">
          <AddTaskDialog
            onAddTask={addTask}
            task={taskToEdit}
            open={dialogOpen}
            setOpen={setDialogOpen}
          />
          <Button onClick={resetAllTasks} variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset All Tasks
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            toggleTaskCompletion={() => toggleTaskCompletion(task.id)}
            onEdit={() => handleEditTask(task)} // Trigger edit
            // onDelete={() => handleDeleteTask(task.id)} // Trigger delete
            setTaskToDelete={DeleteTask}
          />
        ))}
      </div>
      <ConfirmDeleteTask
        taskToDelete={taskToDelete}
        setTaskToDelete={setTaskToDelete}
        handleDeleteTask={handleDeleteTask} // Function to delete after confirming
      />
    </div>
  );
};

export default page;
