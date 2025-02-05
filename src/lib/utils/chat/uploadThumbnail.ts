import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

export const uploadThumbnail = async (file: File) => {
  try {
    // 파일 확장자 유지 및 고유 파일명 생성
    const timestamp = Date.now(); // 현재 시간 기반
    const extension = file.name.split(".").pop() || "png"; // 파일 확장자 추출
    const uniqueFileName = `${timestamp}.${extension}`; // 고유 파일명 생성

    // 파일 경로 설정: chat-images/thumbnail/고유 파일명
    const filePath = `thumbnail/${uniqueFileName}`;

    // Supabase Storage에 파일 업로드
    const { data, error } = await supabase.storage
      .from("chat-images")
      .upload(filePath, file, {
        cacheControl: "3600", // 브라우저 캐시 설정
        upsert: false, // 동일 파일명 업로드 금지
      });

    if (error) {
      throw new Error(`썸네일 업로드 실패: ${error.message}`);
    }

    // 업로드된 파일의 공개 URL 생성
    const { publicUrl } = supabase.storage
      .from("chat-images")
      .getPublicUrl(filePath).data;

    if (!publicUrl) {
      throw new Error("썸네일 URL 생성 실패");
    }

    return publicUrl; // 공개 URL 반환
  } catch (error) {
    console.error("썸네일 URL 업로드 실패", error);
    throw error;
  }
};