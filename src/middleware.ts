import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

const DEFAULT_LOCALE = "es";
const SUPPORTED_LOCALES = ["es", "en"];
const COOKIE_NAME = "NEXT_LOCALE";

export default auth(async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  let currentLocale = req.cookies.get(COOKIE_NAME)?.value || DEFAULT_LOCALE;

  console.log("Current cookie value:", currentLocale);

  // Exclude API routes, static files, and not-found page
  if (pathname.match(/^\/(?:api|_next|.*\..*)/) || pathname === "/not-found") {
    return NextResponse.next();
  }

  const pathLocale = getLocaleFromPath(pathname);

  let response: NextResponse;

  // Handle root path
  if (pathname === "/") {
    const url = new URL(`/${currentLocale}`, req.url);
    url.search = req.nextUrl.search;
    response = NextResponse.redirect(url);
  }
  // Handle paths with supported locale prefix
  else if (pathLocale) {
    response = NextResponse.next();
    currentLocale = pathLocale;
  }
  // Handle paths without locale prefix
  else if (!pathLocale && pathname !== "/") {
    const url = new URL(`/${currentLocale}${pathname}`, req.url);
    url.search = req.nextUrl.search;
    response = NextResponse.redirect(url);
  }
  // For all other cases, proceed with the request
  else {
    response = NextResponse.next();
  }

  // Always set the cookie
  response.cookies.set(COOKIE_NAME, currentLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "strict",
  });

  console.log("Setting cookie:", COOKIE_NAME, "to value:", currentLocale);

  return response;
});

function getLocaleFromPath(pathname: string): string | null {
  const firstSegment = pathname.split("/")[1];
  return SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : null;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
