import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description, priority, roomId } = await req.json();

    // Check if the room exists
    const roomExists = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!roomExists) {
      return NextResponse.json(
        { error: "Room not found. Cannot create task for non-existent room." },
        { status: 404 }
      );
    }

    // Ensure there isn't already a task with the same title in the room
    const existingTask = await prisma.task.findFirst({
      where: { title, roomId },
    });

    if (existingTask) {
      return NextResponse.json(
        { error: "Task with the same title already exists in this room." },
        { status: 409 }
      );
    }

    // Create the task
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        roomId,
      },
    });

    // Add the task to the room and increment taskCount
    const updatedRoom = await prisma.room.update({
      where: { id: roomId },
      data: {
        tasks: {
          connect: { id: newTask.id },
        },
        taskCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        room: true, // Include room data
      },
    });

    return NextResponse.json({ status: "success", tasks }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
