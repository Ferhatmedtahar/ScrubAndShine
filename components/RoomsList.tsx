import RoomItem from "./RoomItem";

export default function RoomsList({
  roomsData,
  setRoomToDelete,
  onEdit,
}: {
  roomsData: any[];
  setRoomToDelete: any;
  onEdit: any;
}) {
  return (
    <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  my-4">
      {roomsData.map((room) => (
        <RoomItem
          key={room.title}
          room={room}
          onEdit={() => onEdit(room)} // Trigger edit
          setRoomToDelete={setRoomToDelete}
        />
      ))}
    </div>
  );
}
