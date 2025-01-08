"use server";

// 예시 코드
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";

// 회원가입 예시 코드
// 받아온 formData에는 email, password, nickname이 존재
export const signup = async (formData: FormData): Promise<void> => {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const { data, error } = await supabase.auth.signUp(inputData);

  if (error) {
    redirect("/error");
  }

  await supabase.from("users").insert({
    email: data.user?.email as string,
    id: data.user?.id as string,
    nickname: formData.get("nickname") as string,
    profile_image: ""
  });
};

// 로그인 예시 코드
export const login = async (formData: FormData) => {
  const supabase = await createClient();

  // 로그인 폼 데이터 읽어오기
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
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
    console.error("유저 정보를 불러오지 못했습니다",userFetchError);
  }

  return userInfo;
};

// 로그아웃 예시 코드
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
