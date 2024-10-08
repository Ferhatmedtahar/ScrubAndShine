// page-client.tsx (client component)
"use client";
import ConfirmDelete from "@/components/ConfirmDelete";
import RoomDialog from "@/components/RoomDialog";
import RoomsList from "@/components/RoomsList";
import Stats from "@/components/Stats";
import { useEffect, useState } from "react";

interface Room {
  id: number;
  title: string;
  description: string;
  taskCount: number;
}

export default function PageClient({ roomsData }: { roomsData: Room[] }) {
  const [rooms, setRooms] = useState(roomsData);
  const [isEditing, setIsEditing] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (!dialogOpen) {
      setIsEditing(false);
      setRoomToEdit(null);
      setDialogOpen(false);
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
    setRoomToDelete(room);
  };

  const handleDeleteRoom = () => {
    if (roomToDelete) {
      setRooms(rooms.filter((room) => room.id !== roomToDelete.id));
      setRoomToDelete(null);
    }
  };

  return (
    <main className="max-container padding-container flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
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
        handleDeleteRoom={handleDeleteRoom}
      />
    </main>
  );
}
