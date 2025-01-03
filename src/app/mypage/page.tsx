import { createClient } from "@/lib/utils/supabase/server";
import { redirect } from "next/navigation";
import SignoutButton from "./_components/SignoutButton";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-full p-8 justify-items-center bg-gray-400">
      <p>Hello {data.user.email}</p>
      <SignoutButton />
    </div>
  );
}
