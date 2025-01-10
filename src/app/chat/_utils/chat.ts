import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

// 채팅방 생성하기
export const createChatRoom = async (
  userId: string,
  roomDetails: {
    title: string;
    subtitle: string;
    description: string;
    hashtags: string[];
    thumbnailUrl: string;
  }
) => {
  try {
    // Step 1: 채팅방 생성
    const { data: chatRoom, error: roomError } = await supabase
      .from("chat_rooms")
      .insert({
        user_id: userId,
        room_title: roomDetails.title,
        room_subtitle: roomDetails.subtitle,
        room_description: roomDetails.description,
        room_hashtags: roomDetails.hashtags,
        room_thumbnail_url: roomDetails.thumbnailUrl,
        isActive: true
      })
      .select()
      .single();

    if (roomError) throw roomError;

    // Step 2: 생성자를 관리자로 등록
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
    // Step 1: 기존 멤버 상태 확인
    const { data: existingMember, error: checkError } = await supabase
      .from("chat_members")
      .select("member_id, room_id, isActive")
      .eq("member_id", userId)
      .eq("room_id", roomId)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116: 데이터가 없음을 나타냄
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
      return { success: false, error: "이미 이 채팅방에 등록된 멤버입니다." };
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

// 채팅방 일반 멤버로 등록하기(기존)
// export const enterAsMember = async (userId: string, roomId: string) => {
//   try {
//     // Step 1: 중복 확인
//     const { data: existingMember, error: checkError } = await supabase
//       .from("chat_members")
//       .select("member_id, room_id")
//       .eq("member_id", userId)
//       .eq("room_id", roomId)
//       .single();

//     if (checkError && checkError.code !== "PGRST116") {
//       throw checkError; // PGRST116: 데이터가 없음을 나타냄
//     }

//     if (existingMember) {
//       return { success: false, error: "이미 이 채팅방에 등록된 멤버입니다." };
//     }

//     // Step 2: 멤버 추가
//     const { error: memberError } = await supabase.from("chat_members").insert({
//       member_id: userId,
//       room_id: roomId,
//       isAdmin: false,
//       isActive: true,
//     });

//     if (memberError) throw memberError;

//     return { success: true };
//   } catch (error) {
//     return { success: false, error: String(error) };
//   }
// };

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

// 일반 멤버의 채팅방 퇴장하기(데이터 테이블에서 삭제)
// export const exitChatRoom = async (userId: string, roomId: string) => {
//   try {
//     const { error } = await supabase
//       .from("chat_members")
//       .delete()
//       .match({ member_id: userId, room_id: roomId });

//     if (error) throw error;

//     return { success: true };
//   } catch (error) {
//     return { success: false, error: String(error) };
//   }
// };
