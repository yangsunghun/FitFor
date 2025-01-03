"use server";

// 예시 코드
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";

// 회원가입 예시 코드
// 받아온 formData에는 email, password, nickname이 존재
export async function signup(formData: FormData): Promise<void> {
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

  const userData = await supabase.from("users").insert({
    email: data.user?.email as string,
    id: data.user?.id as string,
    nickname: formData.get('nickname') as string,
    profile_image: "",
  })

  console.log("회원가입 성공 ->", userData);

  revalidatePath("/", "layout");
  redirect("/");
}

// 로그인 예시 코드
export async function login(formData: FormData) {
  const supabase = await createClient();

  // TODO: 타입 캐스팅 나중에 변경
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  // TODO: 나중에 변경 필요
  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// 로그아웃 예시 코드
export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}
