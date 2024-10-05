import RoomItem from "./RoomItem";

export default function RoomsList() {
  const roomsData = [
    {
      title: "Living Room",
      description: "Main living area with couch and TV",
      tasksCount: 5,
    },
    {
      title: "Kitchen",
      description: "Cooking and dining area",
      tasksCount: 8,
    },
    {
      title: "Bedroom",
      description: "Master bedroom with en-suite bathroom",
      tasksCount: 6,
    },
    {
      title: "Guest Room",
      description: "Comfortable room for guests",
      tasksCount: 3,
    },
    {
      title: "Study Room",
      description: "Work and study area",
      tasksCount: 4,
    },
  ];
  return (
    <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  my-4">
      {roomsData.map((room) => (
        <RoomItem
          key={room.title}
          title={room.title}
          description={room.description}
          tasksCount={room.tasksCount}
        />
      ))}
    </div>
  );
}
