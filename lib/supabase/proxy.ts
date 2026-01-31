import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_PREFIXES = [
  "/auth",
  "/",
  "/about",
  "/contact",
  "/projects",
  "/join",
  "/profile",
  "/dashboard",
];

const ROLE_ALLOWLIST: Record<string, string[]> = {
  "non-member": ["/join", "/dashboard"],
  member: ["/dashboard", "/projects", "/profile", "/settings", "/join"],
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

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: () => { },
      },
    }
  );

  const { data: claims } = await supabase.auth.getClaims();

  if (!claims) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const role = claims.claims?.user_role ?? "non-member";
  const setupDone = claims.claims?.is_setup_done ?? false;


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
