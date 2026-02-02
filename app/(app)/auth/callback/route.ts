import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  // Use "protected" query param as next redirect, default to /dashboard
  let next = searchParams.get('protected') ?? '/dashboard'
  if (!next.startsWith('/')) next = '/dashboard'

 const redirectError = (msg: string) =>
  NextResponse.redirect(`${origin}/auth/error?error=${encodeURIComponent(msg)}`);

if (!code) return redirectError("No code in URL");

try {
  const supabase = await createClient();
  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) return redirectError(exchangeError.message);

  // Normal redirect after success
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocal = process.env.NODE_ENV === "development";
  const redirectUrl = isLocal
    ? `${origin}${next}`
    : forwardedHost
      ? `https://${forwardedHost}${next}`
      : `${origin}${next}`;

  return NextResponse.redirect(redirectUrl);
} catch (err) {
  return redirectError((err as Error).message || "Unexpected error");
}
}