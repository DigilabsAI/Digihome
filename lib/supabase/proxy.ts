import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PUBLIC_PATHS = ["/", "/about", "/contact", "/projects", "/profile/update"];
const AUTH_PATH_PREFIX = "/auth";

const ROLE_ALLOWLIST: Record<string, string[]> = {
  "non-member": [
    "/join",
  ],
  "member": [
    "/dashboard",
    "/projects",
    "/projects/",
    "/profile",
    "/settings",
    "/profile",
  ],
  admin: [
    "/", 
  ],
};

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request });
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith(AUTH_PATH_PREFIX) ||
    PUBLIC_PATHS.includes(pathname)
  ) {
    return response;
  }

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

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


  if (!setupDone && role == "member" && pathname !== "/profile") {
    return NextResponse.redirect(new URL("/profile", request.url));
  }


  if (role === "admin") {
    return response;
  }


  const allowedPaths = ROLE_ALLOWLIST[role] ?? [];
  const isAllowed = allowedPaths.some(
    (allowed) =>
      pathname === allowed || pathname.startsWith(allowed)
  );

  if (!isAllowed) {
    return NextResponse.redirect(new URL("/join", request.url));
  }

  return response;
}
