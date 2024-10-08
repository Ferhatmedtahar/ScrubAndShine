import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    console.log(email);
    if (!email) {
      return NextResponse.json(
        { error: " email  is missing" },
        { status: 400 }
      );
    }
    const name = email.split("@")[0];
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(
      { status: "success", user, message: "user created" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { name, id } = await req.json();
    if (!name || !id) {
      return NextResponse.json(
        { error: "Name or ID missing" },
        { status: 400 }
      );
    }
    const updatedUser = await prisma.user.update({
      where: { id }, // The ID of the room to be updated
      data: {
        name,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    await prisma.user.delete({
      where: { id: data.id }, // The ID of the room to be deleted
    });

    return NextResponse.json({ message: "user deleted" }, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
