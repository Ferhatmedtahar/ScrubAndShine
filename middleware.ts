import { JWTPayload, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

// Secret for JWT verification
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// Middleware to protect specific routes
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const protectedRoutes = ["/profile", "/rooms", "/tasks"];

  // Check if the route is protected
  if (protectedRoutes.includes(pathname)) {
    const userId = await authenticate(request);
    if (userId) {
      console.log("userididid", userId);
      // const response = NextResponse.next();
      // response.cookies.set("userId", userId);
      // return response;
      return NextResponse.next();
    }

    // If not authenticated, redirect to login
    request.nextUrl.searchParams.set("from", request.nextUrl.pathname);
    request.nextUrl.pathname = "/login";
    console.log(request.nextUrl);
    return NextResponse.redirect(request.nextUrl);
  }

  // Continue for routes that don't require authentication
  return NextResponse.next();
}

// Configuration to match protected routes
export const config = {
  matcher: ["/api/:path*"],
};

// Authentication function to verify JWT and extract userId
export async function authenticate(req: NextRequest): Promise<string | false> {
  // Get the JWT from cookies
  const token = req.cookies.get("jwt")?.value || "";

  // If no token is found, return false
  if (!token) {
    return false;
  }

  // Verify the token
  const { payload } = await jwtVerify(token, secret);
  const userPayload = payload as JWTPayload;
  const userId = userPayload.userId as string;

  // If no userId is found in the token, return false
  if (!userId) {
    console.error("User ID not found in token payload");
    return false;
  }

  // Return userId if authenticated
  return userId;
}
