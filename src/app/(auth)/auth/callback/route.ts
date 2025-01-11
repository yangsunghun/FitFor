import { insertUserToPublic } from "@/lib/utils/auth/auth";
import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // 소셜 로그인 한정
      // 유저 정보 public에 저장
      // 구글 
      const { data } = await supabase.auth.getUser();
      
      const email = data.user?.email as string;
      const id = data.user?.id as string;
      const nickname = data.user?.user_metadata.full_name as string;
      const profile_image = data.user?.user_metadata.avatar_url as string;

      await insertUserToPublic({ email, id, nickname, profile_image });

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
