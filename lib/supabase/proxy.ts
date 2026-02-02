import { NextRequest, NextResponse } from "next/server";
import { getUserFromJWT } from "../actions/userAction";

const PUBLIC_PREFIXES = [
  "/auth",
  "/",
  "/about",
  "/contact",
  "/projects",
  "/join",
  "/profile",
 ,
];

const ROLE_ALLOWLIST: Record<string, string[]> = {
  "non-member": ["/join", "/dashboard"],
  member: ["/dashboard", "/projects", "/profile", "/settings", "/join", "/digilabs_projects",
    "/digilabs_projects", "/members", "/resources",],
  admin: ["/"],
};

function isPublic(pathname: string) {
  return PUBLIC_PREFIXES.some(p =>
    p === "/"
      ? pathname === "/"
      : pathname === p || pathname.startsWith(p + "/")
  );
}

function canAccess(pathname: string, role: string) {
  const allowed = ROLE_ALLOWLIST[role] ?? [];
  return allowed.some(p => pathname === p || pathname.startsWith(p));
}

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next({ request });

  if (isPublic(pathname)) return response;

 
  const user = await getUserFromJWT();

  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const role = user?.role ?? "non-member";
  const setupDone = user?.is_setup_done ?? false;


  // hard guard: only members can access /profile/update
  if (pathname.startsWith("/profile/update") && role === "non-member") {
    return NextResponse.redirect(new URL("/", request.url));
  }


  // onboarding guard (loop-safe)
  if (role !== "non-member" && !setupDone && !pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/profile/update", request.url));
  }

  if (role === "non-member" && !setupDone && !pathname.startsWith("/join")) {
    return NextResponse.redirect(new URL("/join", request.url));
  }

  if (!canAccess(pathname, role)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
