"use server";

import { PROVIDER_CONFIG, type LoginForm, type Provider } from "@/lib/types/auth";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 회원가입 코드
// 받아온 formData에는 email, password, nickname이 존재
export const signup = async (formData: FormData): Promise<void> => {
  const supabase = await createClient();

  // 기본 프로파일 이미지
  const profileImage = "/images/default-user-profile.png";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nickname = formData.get("nickname") as string;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: nickname,
        avatar_url: profileImage
      }
    }
  });

  if (error) {
    console.error("signup error -", error);
    redirect("/error");
  }

  await insertUserToPublic({
    email,
    id: data.user?.id as string,
    nickname,
    profile_image: profileImage
  });
};

// public.users에 데이터를 업데이트 해주는 함수
export const insertUserToPublic = async ({
  email,
  id,
  nickname,
  profile_image
}: {
  email: string;
  id: string;
  nickname: string;
  profile_image: string;
}) => {
  const supabase = await createClient();

  // public 유저 테이블에 저장
  const { data, error } = await supabase.from("users").upsert(
    {
      email,
      id,
      nickname,
      profile_image
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("유저 테이블 upsert 에러", error);
  }

  return data;
};

// 일반 로그인 코드
// TODO: 한가지 일로 수정 필요
export const login = async (formData: LoginForm) => {
  const supabase = await createClient();

  // 로그인 폼 데이터 읽어오기
  const data = {
    email: formData.email,
    password: formData.password
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  // 에러 처리
  if (error) {
    console.error("로그인 에러", error);
  }

  // public에 저장된 user 정보 반환
  const { data: userInfo, error: userFetchError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData.user!.id)
    .maybeSingle();

  if (userFetchError) {
    console.error("유저 정보를 불러오지 못했습니다", userFetchError);
  }

  return userInfo;
};

// TODO: 한가지 일을 하는 걸로 변환 
// 로그인된 유저 정보를 가져오는 코드
export const fetchUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser();

  if (getUserError) {
    // 현재 유저가 없는 경우 에러 발생
    // 없는 경우 반환할 값 null
    return null;
  }

  if (user) {
    const { data: userDetails, error: userDetailsError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user!.id)
      .maybeSingle();

    if (userDetailsError || !userDetails) {
      console.error("public 테이블에 유저 정보가 없습니다");
      return;
    }

    return userDetails;
  }

  return null;
};

// 소셜 로그인 코드
export const socialLogin = async (provider: Provider) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: PROVIDER_CONFIG[provider].queryParams
    }
  });

  // 에러 처리
  if (error) {
    console.error("소셜 로그인 에러", error);
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

// 로그아웃 코드
export const signOut = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
};
