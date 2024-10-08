import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get Task by ID
export async function GET(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        room: true, // Include room data
      },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Update Task by ID
export async function PUT(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;
    const { title, description, priority, completed } = await req.json();

    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        priority,
        completed,
      },
    });

    return NextResponse.json(
      { message: "Task updated", updatedTask },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// Delete Task by ID
export async function DELETE(
  req: Request,
  { params }: { params: { taskId: string } }
) {
  try {
    const { taskId } = params;

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
