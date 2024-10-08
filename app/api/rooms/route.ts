import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import slugify from "slugify";

const prisma = new PrismaClient();

// Create a Room
export async function POST(req: Request) {
  try {
    const userId = "670426cf26193be28e49fc48";
    const { title, description } = await req.json();

    // Ensure user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "User not found. Cannot create room for non-existent user." },
        { status: 404 }
      );
    }

    // Generate slug using slugify
    const slug = slugify(title, {
      lower: true, // Convert to lowercase
      strict: true, // Remove special characters
      trim: true, // Trim whitespace
    });

    // Ensure slug is unique
    const roomExists = await prisma.room.findUnique({
      where: { slug },
    });

    if (roomExists) {
      return NextResponse.json(
        {
          error:
            "Room with this title or slug already exists. Please choose a different title.",
        },
        { status: 409 }
      );
    }

    // Create the room since the slug is unique
    const room = await prisma.room.create({
      data: {
        title,
        description,
        slug,
        taskCount: 0,
        userId,
      },
    });

    return NextResponse.json(
      { message: "Room created", room },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json(
      { error: "Failed to create room" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
// Get All Rooms
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        tasks: true, // Include the tasks related to each room
        user: true, // Include the user data
      },
    });

    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
