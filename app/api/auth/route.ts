// /api/auth/magic-link.ts
import { prisma } from "@/lib/prisma";
import { Email } from "@/lib/sendEmail";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!process.env.JWT_SECRET) {
      // return res.status(500).json({ error: "JWT_SECRET is not defined" });
      return NextResponse.json(
        { error: "JWT_SECRET is not defined" },
        { status: 500 }
      );
    }

    // If user doesn't exist, create a new user (but mark them as unverified)
    if (!user) {
      const name = email.split("@")[0];
      user = await prisma.user.create({
        data: {
          name,
          email,
          verified: false,
        },
      });
    }

    //  JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Generate a magic link URL
    const magicLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;

    // Send email with magic link using the Email class
    const emailInstance = new Email(user, magicLink);
    await emailInstance.sendMagicLink(); // You can customize this method if needed

    // /    return res.status(200).json({ message: "Magic link sent to your email" });
    return NextResponse.json(
      { message: "Magic link sent to your email" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl; // Get query parameters from the request
  const token = searchParams.get("token"); // Retrieve the token from the query params

  try {
    // Verify the token
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { error: "JWT_SECRET is not defined" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET
    ) as jwt.JwtPayload;

    // Fetch the user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token or user not found" },
        { status: 401 }
      );
    }

    // Mark user as verified if not already
    if (!user.verified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { verified: true },
      });
    }

    // Set the cookie with the JWT
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Set the token in an HTTP-only cookie
    const cookie = serialize("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 24 * 60 * 60, // 90 days
      path: "/",
    });

    const response = NextResponse.redirect("/rooms");
    response.headers.set("Set-Cookie", cookie); // Set the cookie in the response headers

    return response; // Return the response with the redirect and cookie
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
