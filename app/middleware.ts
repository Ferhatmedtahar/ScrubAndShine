// /middleware.ts
import { JWTPayload, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedRoutes = ["/profile", "/rooms/**", "/tasks/**"];

  if (protectedRoutes.includes(pathname)) {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);
      const userPayload = payload as JWTPayload;

      // Fetch user data using Prisma
      const userId = userPayload.sub; // assuming 'sub' is your user ID field
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          rooms: true, // Include related rooms
        },
      });

      // Check if the user exists
      if (!user) {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      // Add user data to the response headers or any other way you prefer
      const res = NextResponse.next();

      // Ensure userId is a string
      if (typeof userId === "string") {
        res.headers.set("X-User-Id", userId);
      }

      return res;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); // Continue for routes that don't require auth
}

// Configuration
export const config = {
  matcher: ["/profile", "/rooms/:path*", "/tasks/:path*"],
};
