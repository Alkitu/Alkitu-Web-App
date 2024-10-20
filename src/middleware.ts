import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LOCALE = "es";
const SUPPORTED_LOCALES = ["es", "en"];
const COOKIE_NAME = "NEXT_LOCALE";

export async function middleware(req: NextRequest) {
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
    response = NextResponse.redirect(new URL(`/${currentLocale}`, req.url));
  }
  // Handle paths with supported locale prefix
  else if (pathLocale) {
    response = NextResponse.next();
    currentLocale = pathLocale;
  }
  // Handle paths without locale prefix
  else if (!pathLocale && pathname !== "/") {
    const newPathname = `/${currentLocale}${pathname}`;
    response = NextResponse.redirect(new URL(newPathname, req.url));
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
}

function getLocaleFromPath(pathname: string): string | null {
  const firstSegment = pathname.split("/")[1];
  return SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : null;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
