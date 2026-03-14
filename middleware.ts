import { NextRequest, NextResponse } from "next/server";
import { auth } from "./src/lib/auth";

const protectedRoutes = ["/dashboard", "/settings", "/editor"];
const protectedExactRoutes = ["/blogs"];
const authRoutes = ["/auth"];

function matchesRoute(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`);
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.some((route) => matchesRoute(path, route)) ||
    protectedExactRoutes.includes(path);
  const isAuthRoute = authRoutes.some((route) => matchesRoute(path, route));

  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (isProtectedRoute && !session?.user) {
    const loginUrl = new URL("/auth", req.nextUrl);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${path}${req.nextUrl.search}` || path,
    );
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && session?.user) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
