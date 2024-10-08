// /middleware.ts
import { JWTPayload, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

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

      const res = NextResponse.next();
      res.headers.set("X-User-Id", userPayload.sub!);
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
  matcher: ["/profile", "/rooms/:path*"],
};
