import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  // Use "protected" query param as next redirect, default to /dashboard
  let next = searchParams.get('protected') ?? '/dashboard'
  if (!next.startsWith('/')) next = '/dashboard'

  if (!code) {
    console.warn('[OAuth Callback] No code in URL')
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }

  try {
    const supabase = await createClient()

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
    if (exchangeError) {
      console.error('[OAuth Callback] exchangeCodeForSession error:', exchangeError.message)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }


    // Determine redirect
    const forwardedHost = request.headers.get('x-forwarded-host')
    const isLocal = process.env.NODE_ENV === 'development'

    const redirectUrl = isLocal
      ? `${origin}${next}`
      : forwardedHost
        ? `https://${forwardedHost}${next}`
        : `${origin}${next}`

    return NextResponse.redirect(redirectUrl)

  } catch (err) {
    console.error('[OAuth Callback] Unexpected error:', err)
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
  }
}
