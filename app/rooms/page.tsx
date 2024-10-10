import { cookies } from "next/headers";
import PageClient from "./page-client";
export const metadata = {
  title: "Rooms",
};

export default async function Page() {
  const jwt = cookies().get("jwt")?.value!;
  const data = await fetch(`http://localhost:3000/api/rooms?token=${jwt}`, {
    cache: "no-store",
  });
  if (!data.ok) {
    // Handle error if fetching fails
    throw new Error("Failed to fetch rooms");
  }
  const { rooms: roomsData, roomsWithTaskCounts } = await data.json();
  const stats = {
    totalRooms: roomsWithTaskCounts.length,
    totalTasks: roomsWithTaskCounts.reduce(
      (acc: number, room: any) => acc + room.totalTasks,
      0
    ),
    CompletedTasks: roomsWithTaskCounts.reduce(
      (acc: number, room: any) => acc + room.completedTasks,
      0
    ),
  };
  console.log(stats);
  return <PageClient roomsData={roomsData} jwt={jwt} stats={stats} />;
}
