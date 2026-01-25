import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  let next = url.searchParams.get('protected') ?? '/dashboard'
  if (!next.startsWith('/')) next = '/dashboard'

  if (!code) {
    return NextResponse.redirect(`${url.origin}/auth/auth-code-error`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${url.origin}/auth/auth-code-error`)
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? url.origin

  return NextResponse.redirect(`${baseUrl}${next}`)
}
