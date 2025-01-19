import { createChatRoom } from "./chat";
import { uploadThumbnail } from "./uploadThumbnail";

export const createRoomHandler = async (
  userId: string,
  roomDetails: {
    title: string;
    thumbnail: File; // 추가: 썸네일 파일
    tags: string[];
  }
) => {
  try {
    // Step 1: 썸네일 업로드 및 URL 생성
    const thumbnailUrl = await uploadThumbnail(roomDetails.thumbnail);

    // Step 2: 기존 createChatRoom 호출
    const response = await createChatRoom(userId, {
      title: roomDetails.title,
      tags: roomDetails.tags,
      thumbnailUrl // 업로드된 썸네일 URL 전달
    });

    return response; // createChatRoom의 응답 반환
  } catch (error) {
    console.error("Error in createChatRoomHandler:", error);
    return { success: false, error: String(error) };
  }
};
