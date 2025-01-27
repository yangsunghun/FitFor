import { adminAuthClient } from "@/lib/utils/supabase/admin";
import { createClient } from "@/lib/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "유저가 확인되지 않습니다." });
    }

    // public.users에서도 지우기
    const { error: publicUserError } = await supabase.from("users").delete().eq("id", user.id);

    if (publicUserError) throw publicUserError;

    const { error: authUserError } = await adminAuthClient.deleteUser(user.id);

    if (authUserError) throw authUserError;
    return NextResponse.json({ message: "회원 탈퇴 성공" });
  } catch (error: any) {
    console.error("[회원 탈퇴 오류]", error.message);
    return NextResponse.json({ error: error.message });
  }
}
