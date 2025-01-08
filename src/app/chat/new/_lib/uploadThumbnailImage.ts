import { createClient } from "@/lib/utils/supabase/client";

export const uploadThumbnailImage = async ({ type, file }: { type: string; file: File }) => {
  const supabase = createClient();
  const user = await getAuthenticatedUser();
  const fileName = `${type}-${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage.from("chat-images").upload(fileName, file);

  if (error) {
    console.error("Image upload failed:", error);
    throw new Error("이미지 업로드 실패");
  }

  // 업로드된 이미지의 퍼블릭 URL 가져오기
  const { data: publicUrlData } = supabase.storage.from("chat-images").getPublicUrl(data.path);
  if (!publicUrlData?.publicUrl) {
    throw new Error("퍼블릭 URL을 가져올 수 없습니다.");
  }

  return publicUrlData.publicUrl;
};
