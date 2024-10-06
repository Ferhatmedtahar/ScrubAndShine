"use client";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Textarea } from "@/components/TextArea";
import { useEffect, useState } from "react";

type Task = {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
};

function AddTaskDialog({
  onAddTask,
  task,
  open,
  setOpen,
}: {
  onAddTask: any;
  task: Task | null;
  open: boolean;
  setOpen: (open: boolean) => void; // Pass the setOpen function from the parent
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Medium");
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAddTask({ title, description, priority });
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="xs:max-w-[320px] xs:max-h-[400px] rounded-lg  sm:max-w-[425px] sm:max-h-[450px] bg-blue-50">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
          <DialogDescription>
            {task
              ? "Modify the task details. Click save when you're done."
              : "Create a new task. Click create when you're done."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <div className="col-span-3 flex gap-4">
              <Label className="flex items-center gap-1">
                <Input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={() => setPriority("Low")}
                  required
                />
                <span className="text-green-500">Low</span>
              </Label>
              <Label className="flex items-center gap-1">
                <Input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={() => setPriority("Medium")}
                />
                <span className="text-yellow-500">Medium</span>
              </Label>
              <Label className="flex items-center gap-1">
                <Input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={priority === "High"}
                  onChange={() => setPriority("High")}
                />
                <span className="text-red-500">High</span>
              </Label>
            </div>
          </div>

          <Button type="submit" className="ml-auto">
            {task ? "Save Changes" : "Create Now"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
export default AddTaskDialog;
