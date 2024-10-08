// /api/stats.ts (Next.js API route)
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // Import prisma client

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query; // Assuming userId is passed in the query params
  if (!userId) {
    return res
      .status(400)
      .json({ error: "Missing userId in query parameters." });
  }

  try {
    // Fetch rooms for the specific user
    const rooms = await prisma.room.findMany({
      where: {},
      include: {
        tasks: true, // Include the tasks associated with each room
      },
    });

    // Calculate the total number of rooms for the user
    const totalRooms = rooms.length;

    // Calculate the total number of tasks for the user across all rooms
    const totalTasks = rooms.reduce((sum, room) => sum + room.tasks.length, 0);

    // Calculate the total number of completed tasks for the user across all rooms
    const completedTasks = rooms.reduce(
      (sum, room) => sum + room.tasks.filter((task) => task.completed).length,
      0
    );

    // Return the stats as JSON
    return res.status(200).json({
      totalRooms,
      totalTasks,
      completedTasks,
    });
  } catch (error) {
    console.error("Error fetching user-specific stats:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch user-specific stats" });
  } finally {
    await prisma.$disconnect();
  }
}
