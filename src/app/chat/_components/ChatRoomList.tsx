"use client";

import sampleImage from "@/assets/images/image_sample.png";
import { MinTablet, Tablet } from "@/components/common/BreakPoints";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import ProfileImageCircle from "@/components/shared/ProfileImageCircle";
import FloatingButton from "@/components/ui/FloatingButton";
import SlideOver from "@/components/ui/SlideOver";
import { Tags } from "@/components/ui/Tags";
import { TAG_GROUPS } from "@/lib/constants/constants";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { VideoCamera } from "@phosphor-icons/react";
import Image from "next/image";
import RoomFilterMobile from "./RoomFilterMobile";
import RoomFilters from "./RoomFilters";
import TagFilters from "./TagFilters";
import { useAuthStore } from "@/lib/store/authStore";
import useCategoryStore from "@/lib/store/useCategoryStore";
import { useEffect, useRef, useState } from "react";
import { useChatRooms } from "@/lib/hooks/chat/useChatRooms";
import { useChatRoomQuery } from "@/lib/hooks/chat/useChatRoomQuery";
import SortChatRooms from "./SortChatRooms";
import { useRouter } from "next/navigation";
import { enterAsMember } from "@/lib/utils/chat/chat";

const ChatRoomList = () => {
  const currentUser = useAuthStore((state) => state.user);
  const { selectedCategory, setSelectedCategory, isHydrated } = useCategoryStore();
  const { tags, sort, handleSort, handleToggleTag, resetTags } = useChatRoomQuery();
  const [readyToRender, setReadyToRender] = useState(false);
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatRooms(Object.values(tags).flat(), sort);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const selectedTags = Object.entries(tags).flatMap(([groupKey, groupTags]) =>
    groupTags.map((tag) => ({ groupKey, tag }))
  );

  const handleEnterRoom = async (roomId: string) => {
    if (!currentUser?.id) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      router.push("/login");
      return;
    }

    try {
      await enterAsMember(currentUser.id, roomId);
      router.push(`/chat/${roomId}`);
    } catch (error) {
      console.error("채팅방 입장 중 오류 발생");
    }
  };

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (isHydrated) {
      setReadyToRender(true);
    }
  }, [isHydrated]);

  if (!readyToRender) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <MinTablet>
        <RoomFilters tags={tags} handleToggleTag={handleToggleTag} />
      </MinTablet>
      <Tablet>
        <RoomFilterMobile
          selectedGroup={selectedCategory ?? TAG_GROUPS[0].key}
          setSelectedGroup={setSelectedCategory}
          selectedTags={selectedTags}
          handleToggleTag={handleToggleTag}
          setIsOpen={setIsOpen}
        />
      </Tablet>

      <div className="relative mb-5 mt-10 flex justify-end tb:mb-0 tb:mt-2">
        <SortChatRooms sort={sort} handleSort={handleSort} />
      </div>

      <div className="mt-10 tb:mt-0">
        <ul className="grid grid-cols-5 gap-3 tb:grid-cols-3 mb:grid-cols-2">
          {data?.pages.map((page) =>
            page.chatRooms.map((room) => (
              <li key={room.room_id} className="relative mb-4">
                <button onClick={() => handleEnterRoom(room.room_id)} className="click-box z-10" />
                <figure className="thumbnail h-[252px] rounded-2xl mb:h-[200px] mb:w-[166px]">
                  <Image src={room.room_thumbnail_url || sampleImage} alt={room.room_title} fill={true} sizes="252px" />
                  <figcaption className="absolute left-4 top-4 flex flex-row items-center justify-center gap-[6px] rounded-[4px] bg-text-04 px-1">
                    <div className="h-2 w-2 rounded-full bg-status-danger"></div>
                    <p className="text-caption font-medium text-text-01">{room.participantCount}명</p>
                  </figcaption>
                </figure>

                <div className="mt-4 flex gap-[7px]">
                  <figure className="relative flex-shrink-0">
                    <ProfileImageCircle
                      profileImage={room.user.profile_image}
                      nickname={room.user.nickname}
                      size={32}
                      className="h-10 w-10"
                    />
                  </figure>
                  <div>
                    <p className="line-clamp-2 text-body font-medium">{room.room_title}</p>
                    <p className="text-caption text-text-03">{room.user.nickname}</p>
                  </div>
                </div>

                <div className="ml-[39px] flex flex-wrap">
                  {room.room_tags.map((tags) => (
                    <Tags
                      key={tags}
                      variant="grayLine"
                      size="sm"
                      label={tags}
                      className="flex items-center justify-center px-2 py-1"
                    />
                  ))}
                </div>
              </li>
            ))
          )}

          <div ref={observerRef} />
          {isFetchingNextPage && <LoadingSpinner />}
        </ul>
      </div>

      {isOpen && (
        <SlideOver title="필터" article="최대 1개까지 선택 가능해요" onClose={() => setIsOpen(false)}>
          <TagFilters
            selectedGroup={selectedCategory}
            tags={tags}
            handleToggleTag={handleToggleTag}
            resetTags={resetTags}
            onClose={() => setIsOpen(false)}
          />
        </SlideOver>
      )}

      {currentUser && (
        <FloatingButton
          href="/chat/new"
          icon={
            <VideoCamera className="mr-2 inline-block text-text-03" size={isTabletOrSmaller ? 16 : 20} weight="fill" />
          }
          text="새 코칭방 만들기"
        />
      )}
    </div>
  );
};

export default ChatRoomList;
