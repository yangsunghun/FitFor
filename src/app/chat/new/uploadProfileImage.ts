import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

interface UploadImageParams {
  type: "chat-thumbnail"; // 현재 `chat-thumbnail` 타입만 사용
  file: File;
}

export const uploadProfileImage = async ({ type, file }: UploadImageParams): Promise<string> => {
  try {
    if (!file) {
      throw new Error("No file provided for upload.");
    }

    // 파일 이름 설정 (폴더 포함)
    const fileName = `rooms/${Date.now()}-${file.name}`; // "rooms/" 경로에 파일 저장

    // Supabase 스토리지에 이미지 업로드
    const { data, error } = await supabase.storage
      .from("chat-images") // 스토리지 버킷 이름
      .upload(fileName, file, {
        contentType: file.type, // 파일 MIME 타입 설정
        upsert: false // 중복된 파일 이름 업로드 방지
      });

    if (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }

    // 업로드된 파일의 퍼블릭 URL 생성
    const { data: publicUrlData } = supabase.storage.from("chat-images").getPublicUrl(fileName);

    if (!publicUrlData.publicUrl) {
      throw new Error("Failed to generate public URL for the uploaded image.");
    }

    return publicUrlData.publicUrl; // 업로드된 이미지의 퍼블릭 URL 반환
  } catch (error: any) {
    console.error(error.message);
    throw new Error(`Error uploading image: ${error.message}`);
  }
};
