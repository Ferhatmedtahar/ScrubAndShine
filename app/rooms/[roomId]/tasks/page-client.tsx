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

const PageClient = ({
  tasksData,
  params,
}: {
  tasksData: Task[];
  params: { roomId: string }; // Ensure this matches the expected structure
}) => {
  const { roomId } = params;

  const roomSlug = roomId.split("-").join(" ");

  const [tasks, setTasks] = useState<Task[]>(tasksData);

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

  //!reset all tasks
  const resetAllTasks = async () => {
    // Create an array of promises for each task update
    const updatePromises = tasks.map(async (task) => {
      // Update task in the database to set completed to false
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...task, completed: false }), // Send updated task
      });

      if (!response.ok) {
        // Handle error if needed (e.g., log it)
        console.error(`Failed to update task ${task.id}:`, response.statusText);
      }

      return response; // You can return the response if needed
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    // Update local state to reflect changes
    setTasks(tasks.map((task) => ({ ...task, completed: false })));
  };

  const toggleTaskCompletion = async (taskId: number) => {
    // Find the current task to get its current 'completed' status
    const taskToUpdate = tasks.find((task) => task.id === taskId);

    if (!taskToUpdate) return; // Ensure the task exists before proceeding

    const newCompletedStatus = !taskToUpdate.completed; // Toggle the completed status

    // Optimistically update the local state
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: newCompletedStatus } : task
      )
    );

    try {
      // Send a PUT request to the backend to update the task
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: newCompletedStatus }), // Send the new completed status
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update task ${taskId}: ${response.statusText}`
        );
      }

      const updatedTask = await response.json(); // Get the updated task from the response (optional)
      console.log("Task updated successfully:", updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);

      // Optional: Revert the state if the API call fails
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? { ...task, completed: taskToUpdate.completed }
            : task
        )
      );
    }
  };

  const addTask = async (newTask: Task) => {
    if (isEditing && taskToEdit) {
      const updatedTask = await fetch(`/api/tasks/${taskToEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTask, id: taskToEdit.id }),
      });
      const data = await updatedTask.json();
      setTasks(
        tasks.map((task) =>
          task.id === taskToEdit.id ? { ...newTask, id: task.id } : task
        )
      );
      setIsEditing(false);
      setTaskToEdit(null);
    } else {
      const createdTask = await fetch(`/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTask, roomId }),
      });
      const data = await createdTask.json();
      setTasks([...tasks, { ...newTask, id: data.id }]);
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

  const handleDeleteTask = async () => {
    if (taskToDelete) {
      await fetch(`/api/tasks/${taskToDelete.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: taskToDelete.id, roomId }),
      });
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
export default PageClient;
