import { ArrowRight, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import RoomButton from "./RoomButton";

export default function RoomItem({
  room,
  onEdit,
  setRoomToDelete,
}: {
  room: any;
  onEdit: any;
  setRoomToDelete: any;
}) {
  const { title, description, taskCount } = room;
  // title={room.title}
  // description={room.description}
  // tasksCount={room.taskCount}
  return (
    <div className="border border-darkPrimary-300  bg-green-100/10 rounded-lg p-4 hover:bg-bg-300 transition-all duration-150">
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h1 className="text-lg  font-semibold blue-gradient">{title}</h1>
        <div className="flex space-x-2">
          <RoomButton variant="edit" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </RoomButton>
          <RoomButton
            variant="delete"
            onClick={() => {
              setRoomToDelete(room);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </RoomButton>
        </div>
      </div>
      <div>
        <p className="text-xs text-gray-600 mb-4 sm:text-sm md:text-base ">
          {description}
        </p>
        <div className=" flex justify-between items-center ">
          <span className="text-sm font-medium">{taskCount} tasks</span>
          <RoomButton variant="base">
            <Link
              className="flex items-center text-sm font-medium px-0.5 "
              href={`/rooms/${title.toLowerCase().replace(" ", "-")}/tasks`}
            >
              View Tasks <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </RoomButton>
        </div>
      </div>
    </div>
  );
}
