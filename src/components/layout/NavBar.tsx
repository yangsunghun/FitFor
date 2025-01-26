"use client";
import Profile from "@/assets/images/Profile";
import { useNavBarStore } from "@/lib/store/useNavBarStore";
import { BookmarkSimple, House, MagnifyingGlass, VideoCamera } from "@phosphor-icons/react";
import { Suspense } from "react";
import NavItem from "./NavItem";

const NavBar = () => {
  const { isVisible } = useNavBarStore();

  if (!isVisible) return null;

  return (
    <nav className="fixed bottom-0 z-40 hidden w-full bg-bg-01 pb-7 text-small text-text-02 tb:block">
      <ul className="flex justify-between">
        <Suspense fallback={<p></p>}>
          <NavItem href="/home" location="/home" icon={<House weight="fill" size={24} />} label="홈" />
          <NavItem href="/search?popup=true" location="/search" icon={<MagnifyingGlass size={24} />} label="검색" />
          <NavItem href="/chat" location="/chat" icon={<VideoCamera weight="fill" size={24} />} label="Live" />
          <NavItem
            href="/bookmark"
            location="/bookmark"
            icon={<BookmarkSimple weight="fill" size={24} />}
            label="북마크"
          />
          <NavItem href="/mypage" location="/mypage" icon={<Profile />} label="My" />
        </Suspense>
      </ul>
    </nav>
  );
};

export default NavBar;
