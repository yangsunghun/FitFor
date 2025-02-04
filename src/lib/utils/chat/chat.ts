import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 채팅방 생성하기
export const createChatRoom = async (
  userId: string,
  roomDetails: {
    title: string;
    thumbnailUrl: string;
    tags: string[];
  }
) => {
  try {
    // 채팅방 생성
    const { data: chatRoom, error: roomError } = await supabase
      .from("chat_rooms")
      .insert({
        user_id: userId,
        room_title: roomDetails.title,
        room_thumbnail_url: roomDetails.thumbnailUrl,
        room_tags: roomDetails.tags,
        isActive: true
      })
      .select()
      .single();

    if (roomError) throw roomError;

    // 생성자를 관리자로 등록
    const { error: adminError } = await enterAsAdmin(userId, chatRoom.room_id);

    if (adminError) throw adminError;

    return { success: true, data: chatRoom };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

// 채팅방 관리자로 등록하기
export const enterAsAdmin = async (userId: string, roomId: string) => {
  try {
    const { error } = await supabase.from("chat_members").insert({
      member_id: userId,
      room_id: roomId,
      isAdmin: true,
      isActive: true
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

// 채팅방 일반 멤버로 등록하기(기존 멤버의 isActive 상태를 활용해서 입장 가능 여부 판단)
export const enterAsMember = async (userId: string, roomId: string) => {
  try {
    // 기존 멤버 상태 확인
    const { data: existingMember, error: checkError } = await supabase
      .from("chat_members")
      .select("member_id, room_id, isActive")
      .eq("member_id", userId)
      .eq("room_id", roomId)
      .maybeSingle();

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }

    if (existingMember) {
      // 기존 멤버가 비활성화 상태인 경우, 활성화 처리
      if (!existingMember.isActive) {
        const { error: updateError } = await supabase
          .from("chat_members")
          .update({ isActive: true })
          .match({ member_id: userId, room_id: roomId });

        if (updateError) throw updateError;

        return { success: true, message: "멤버가 다시 활성화되었습니다." };
      }

      // 이미 활성화된 멤버인 경우
      return { success: true };
    }

    // Step 2: 멤버 새로 추가
    const { error: memberError } = await supabase.from("chat_members").insert({
      member_id: userId,
      room_id: roomId,
      isAdmin: false,
      isActive: true
    });

    if (memberError) throw memberError;

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

// 방장 정보 가져오기
export const getAdminDetails = async (roomId: string) => {
  try {
    // 방장의 member_id 가져오기
    const { data: adminMember, error: adminError } = await supabase
      .from("chat_members")
      .select("member_id")
      .eq("room_id", roomId)
      .eq("isAdmin", true)
      .single();

    if (adminError || !adminMember) throw adminError || new Error("방장을 찾을 수 없습니다.");

    // 방장의 프로필 정보 가져오기
    const { data: adminProfile, error: profileError } = await supabase
      .from("users")
      .select("id, nickname, profile_image")
      .eq("id", adminMember.member_id)
      .single();

    if (profileError || !adminProfile) throw profileError || new Error("방장의 프로필 정보를 찾을 수 없습니다.");

    // 방장 정보 반환
    return {
      success: true,
      data: {
        name: adminProfile.nickname,
        profileImageUrl: adminProfile.profile_image
      }
    };
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return { success: false, error: String(error) };
  }
};

// 일반 멤버의 채팅방 퇴장하기(비활성화)
export const exitChatRoom = async (userId: string, roomId: string) => {
  try {
    const { error } = await supabase
      .from("chat_members")
      .update({ isActive: false })
      .match({ member_id: userId, room_id: roomId });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

// 채팅방 삭제하기 (방장만 가능)
export const deleteChatRoom = async (userId: string | undefined, roomId: string) => {
  try {
    // 방장 확인
    const { data: roomData, error: roomError } = await supabase
      .from("chat_rooms")
      .select("user_id")
      .eq("room_id", roomId)
      .single();

    if (roomError || !roomData) {
      throw new Error("채팅방을 찾을 수 없습니다.");
    }

    if (roomData.user_id !== userId) {
      throw new Error("방장만 채팅방을 삭제할 수 있습니다.");
    }

    // Step 2: 채팅방 삭제
    const { error: deleteError } = await supabase.from("chat_rooms").delete().eq("room_id", roomId);

    if (deleteError) {
      throw deleteError;
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
};

export const sendMessage = async ({
  message,
  file,
  roomId,
  memberId
}: {
  message: string;
  file: File | null;
  roomId: string;
  memberId: string;
  }) => {
  console.log("💡 sendMessage 호출됨:", { memberId, message, roomId, file });
  let fileUrl = null;

  // 파일 용량 제한 (예: 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif"];

  if (file) {
    // 파일 용량 검증
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("파일 용량은 5MB를 초과할 수 없습니다..");
    }

    // 파일 확장자 검증
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension || "")) {
      throw new Error(`허용되지 않는 파일 유형입니다. allowed extensions: ${ALLOWED_EXTENSIONS.join(", ")}`);
    }

    // 한글 파일 이름 처리
    const sanitizedFileName = `${Date.now()}-${memberId}.${fileExtension}`;

    // 파일 업로드
    const { data, error: uploadError } = await supabase.storage
      .from("chat-images")
      .upload(`rooms/${roomId}/${sanitizedFileName}`, file);

    if (uploadError) {
      throw new Error(uploadError.message);
    }
    fileUrl = data?.path;
  }

  // 메시지 저장
  const { error } = await supabase.from("chat_messages").insert({
    content: message || null,
    member_id: memberId,
    room_id: roomId,
    image_url: fileUrl || null,
    created_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(error.message);
  }
};
