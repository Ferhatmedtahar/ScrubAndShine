import { prisma } from "@/lib/prisma"; // Adjust the import according to your project structure
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    // Fetch total rooms for the user
    const totalRooms = await prisma.room.count({
      where: { userId: userId }, // Adjust based on your relationship
    });

    // Fetch total tasks for the user
    // const tasks = await prisma.task.findMany({
    //   where: { userId: userId }, // Adjust based on your relationship
    // });

    // const totalTasks = tasks.length;
    // const completedTasks = tasks.filter((task) => task.completed).length; // Assuming you have a `completed` boolean field

    return NextResponse.json(
      {
        status: "success",
        totalRooms,
        // totalTasks,
        // completedTasks,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch user stats" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
