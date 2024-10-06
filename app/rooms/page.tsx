"use client";
import ConfirmDelete from "@/components/ConfirmDelete";
import RoomDialog from "@/components/RoomDialog";
import RoomsList from "@/components/RoomsList";
import Stats from "@/components/Stats";
import { useEffect, useState } from "react";

// export const metadata = {
//   title: "Rooms",
// };

interface Room {
  id: number;
  title: string;
  description: string;
  taskCount: number;
}

const roomsData: Room[] = [
  {
    id: 0,
    title: "Living Room",
    description: "Main living area with couch and TV",
    taskCount: 5,
  },
  {
    id: 1,
    title: "Kitchen",
    description: "Cooking and dining area",
    taskCount: 8,
  },
  {
    id: 2,
    title: "Bedroom",
    description: "Master bedroom with en-suite bathroom",
    taskCount: 6,
  },
  {
    id: 3,
    title: "Guest Room",
    description: "Comfortable room for guests",
    taskCount: 3,
  },
  {
    id: 4,
    title: "Study Room",
    description: "Work and study area",
    taskCount: 4,
  },
];

export default function page() {
  const [rooms, setRooms] = useState(roomsData);
  const [isEditing, setIsEditing] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false); // Control dialog

  useEffect(() => {
    if (!dialogOpen) {
      setIsEditing(false);
      setRoomToEdit(null); // Clear the room to edit
      setDialogOpen(false); // Close the dialog
    }
  }, [dialogOpen]);

  const addRoom = (newRoom: Room) => {
    if (isEditing && roomToEdit) {
      setRooms(
        rooms.map((room) =>
          room.id === roomToEdit.id ? { ...newRoom, id: room.id } : room
        )
      );
      setIsEditing(false);
      setRoomToEdit(null);
    } else {
      setRooms([...rooms, { ...newRoom, id: rooms.length + 1 }]);
    }
  };

  const handleEditRoom = (room: Room) => {
    setRoomToEdit(room);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const DeleteRoom = (room: Room) => {
    setRoomToDelete(room); // Open delete confirmation dialog by setting the room
  };

  const handleDeleteRoom = () => {
    if (roomToDelete) {
      setRooms(rooms.filter((room) => room.id !== roomToDelete.id));
      setRoomToDelete(null);
    }
  };

  return (
    <main className=" max-container padding-container flex   flex-col gap-4">
      <div className="flex flex-col  items-center  gap-2 md:flex-row  md:justify-between ">
        <Stats />
        <RoomDialog
          onAddRoom={addRoom}
          room={roomToEdit}
          open={dialogOpen}
          setOpen={setDialogOpen}
        />
      </div>

      <RoomsList
        setRoomToDelete={DeleteRoom}
        roomsData={rooms}
        onEdit={handleEditRoom}
      />
      <ConfirmDelete
        roomToDelete={roomToDelete}
        setRoomToDelete={setRoomToDelete}
        handleDeleteRoom={handleDeleteRoom} // Function to delete after confirming
      />
    </main>
  );
}

// roomsData={roomsData}
// onEdit={handleEditTask}
// onDelete={handleDeleteTask}
