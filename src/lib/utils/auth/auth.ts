"use server";

import { LoginForm, Provider, PROVIDER_CONFIG, SignupForm, type User } from "@/lib/types/auth";
import { createClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 회원가입 코드
// 받아온 formData에는 email, password, nickname이 존재
export const signup = async (formData: SignupForm): Promise<void> => {
  const supabase = await createClient();

  // 기본 프로파일 이미지
  const profileImage = "/images/default-user-profile.png";

  const email = formData.email;
  const password = formData.password;
  const nickname = formData.nickname;

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

  try {
    // 유저가 기존에 로그인한적이 있는지 확인
    const { data: existingUser, error: selectError } = await supabase.from("users").select("id").eq("id", id).single();

    // 없는 경우(에러)를 제외한 에러 처리
    if (selectError && selectError.code !== "PGRST116") {
      console.error("[기존 유저 체크 오류]", selectError.message);
      throw selectError;
    }

    // 로그인 했던 유저라면
    // 새로 추가 X
    if (existingUser) {
      return null;
    }

    // 처음 로그인한 유저는 public.users에 추가
    const { data, error: insertError } = await supabase.from("users").insert({
      email,
      id,
      nickname,
      profile_image
    });

    // 추가 에러시 처리
    if (insertError) {
      console.error("[유저 정보 데이터베이스 저장 오류]", insertError.message);
      throw insertError;
    }

    return data;
  } catch (error) {
    console.error("insertUserToPublic error:", error);
    throw error;
  }
};

// 일반 로그인 코드
export const login = async (formData: LoginForm) => {
  const supabase = await createClient();
  const email = formData.email;
  const password = formData.password;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  // 에러 처리
  if (error) {
    console.error("로그인 에러", error);
  }
};

// 로그인된 유저의 public users 정보를 가져오는 코드
export const fetchUser = async (): Promise<User | null> => {
  const supabase = await createClient();

  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser();

  // 비로그인 회원
  if (getUserError) {
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
      throw new Error("public 테이블에 유저 정보가 없습니다");
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
