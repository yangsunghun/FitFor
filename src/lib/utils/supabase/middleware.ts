import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// 로그인된 사용자가 접근할 수 없는 경로
const restrictedPaths = ["/login"];
// 인증이 필요한 경로
const protectedPaths = ["/bookmark", "/write", "/mypage", "/chat/new"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // 일반 회원가입 기능은 1차에서 잠시 사용 X
  if (request.nextUrl.pathname.startsWith("/signup")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 현재 로그인 상태이면서 경로가 /login 인 경우 마이페이지 리다이렉트.
  if (user && restrictedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/mypage", request.url));
  }

  // 로그인을 하지 않았는데 마이페이지에 접근하면 로그인 페이지로 리다이렉트
  if (!user && protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}
