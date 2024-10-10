import { prisma } from "@/lib/prisma"; // Adjust the import according to your project structure
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return NextResponse.json(
      {
        status: "success",
        user,
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

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  const { name } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        status: "success",
        updatedUser,
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
