import { Check, ChevronDown, ChevronUp, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import Badge from "./Badge";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

export default function TaskCard({
  title,
  description,
  priority,
  onEdit, // Pass the onEdit handler from parent
  onDelete,
}: {
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold ">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Badge priority={priority} />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">
              {expanded ? "Collapse" : "Expand"} task details
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p
          className={`text-sm text-muted-foreground ${
            expanded ? "" : "line-clamp-2"
          }`}
        >
          {description}
        </p>
        {expanded && (
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="hover:bg-blue-400 hover:text-white hover:border-blue-700 duration-200 transition-all"
              onClick={onEdit} // Call the onEdit handler
            >
              <Edit className="mr-2 h-4 w-4" /> Edit
              <span className="sr-only">Edit task</span>
            </Button>
            <Button
              onClick={onDelete}
              size="sm"
              className="hover:bg-red-500 hover:border-red-700 hover:text-white duration-200 transition-all"
              variant="outline"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
              <span className="sr-only">Delete task</span>
            </Button>
            <Button
              size="sm"
              variant="default"
              className=" hover:border-gray-800  duration-200 transition-all"
            >
              <Check className="mr-2 h-4 w-4" /> Mark as Finished
              <span className="sr-only">Mark task as finished</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
