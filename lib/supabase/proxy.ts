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
];

const ROLE_ALLOWLIST: Record<string, string[]> = {
  "non-member": ["/join"],
  member: ["/dashboard", "/projects", "/profile", "/settings","/join"],
  admin: ["/"],
};
  
function isPublic(pathname: string) {
  return PUBLIC_PREFIXES.some(p => pathname === p || pathname.startsWith(p));
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
        setAll: () => {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const { data } = await supabase
    .from("users")
    .select("role, is_setup_done")
    .eq("id", user.id)
    .single();

  const role = data?.role ?? "non-member";
  const setupDone = data?.is_setup_done ?? false;

  // onboarding guard (loop-safe)
  if (role === "member" && !setupDone && !pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/profile/update", request.url));
  }

  if (!canAccess(pathname, role)) {
    return NextResponse.redirect(new URL("/join", request.url));
  }

  return response;
}
