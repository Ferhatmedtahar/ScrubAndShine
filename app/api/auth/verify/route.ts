import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl; // Get query parameters from the request
  const token = searchParams.get("token"); // Retrieve the token from the query params
  console.log(token);
  try {
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
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    // Mark user as verified if not already
    if (!user.verified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { verified: true, token: jwtToken },
      });
    }
    if (user.token) {
      await prisma.user.update({
        where: { id: user.id },
        data: { token: jwtToken },
      });
    }

    // Set the cookie with the JWT

    // // Set the token in an HTTP-only cookie
    // const cookie = cookies().set("token", jwtToken, {
    //   httpOnly: true,
    //   maxAge: 60 * 60 * 24 * 60,
    //   secure: process.env.NODE_ENV === "production",
    //   path: "/",
    // });

    const response = NextResponse.redirect(new URL("/rooms", req.url));
    response.headers.set(
      "token",
      `${jwtToken}; HttpOnly; Max-Age=${60 * 60 * 24 * 60}; Path=/; Secure=${
        process.env.NODE_ENV === "production"
      }`
    );
    return response;
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
