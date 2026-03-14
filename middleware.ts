import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/settings", "/editor"];
const protectedExactRoutes = ["/blogs"];
const authRoutes = ["/auth"];

// Better Auth session cookie name (default)
const SESSION_COOKIE = "better-auth.session_token";

function matchesRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.some((route) => matchesRoute(path, route)) ||
    protectedExactRoutes.includes(path);
  
  const isAuthRoute = authRoutes.some((route) => matchesRoute(path, route));

  const hasSession = req.cookies.has(SESSION_COOKIE);

  if (isProtectedRoute && !hasSession) {
    const loginUrl = new URL("/auth", req.nextUrl);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${path}${req.nextUrl.search}` || path,
    );
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
