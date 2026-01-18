import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
 const response = NextResponse.next({ request });

  const pathname = request.nextUrl.pathname;

  // 1️⃣ Skip RBAC checks for public pages and auth callbacks
  const publicPaths = ["/", "/about", "/contact", "/projects"];
  if (pathname.startsWith("/auth") || publicPaths.includes(pathname)) {
    return response;
  }

  // 2️⃣ Create Supabase client (server-side)
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

  // 3️⃣ Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Not logged in → redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 4️⃣ Query role and setup from DB
  const { data, error } = await supabase
    .from("users")
    .select("role, is_setup_done")
    .eq("id", user.id)
    .single();

  const role = data?.role ?? "non-member";
  const setupDone = data?.is_setup_done ?? false;

 
  // // 5️⃣ Enforce setup page
  // if (!setupDone && pathname !== "/setup") {
  //   return NextResponse.redirect(new URL("/setup", request.url));
  // }

  // // 6️⃣ Enforce admin pages
  // if (pathname.startsWith("/admin") && role !== "admin") {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // 7️⃣ Everything else is fine
  return response;
}