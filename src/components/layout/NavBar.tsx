"use client";
import profileIcon from "@/assets/images/profile.svg";
import { useNavBarStore } from "@/lib/store/useNavBarStore";
import { BookmarkSimple, House, MagnifyingGlass, VideoCamera } from "@phosphor-icons/react";
import Image from "next/image";
import { Suspense } from "react";
import NavItem from "./NavItem";

const NavBar = () => {
  const { isVisible } = useNavBarStore();

  if (!isVisible) return null;

  return (
    <nav className="fixed bottom-0 z-40 hidden w-full bg-bg-01 pb-7 text-small text-text-02 tb:block">
      <ul className="flex justify-between">
        <Suspense fallback={<p></p>}>
          <NavItem href="/home" icon={<House weight="fill" size={24} />} label="홈" />
          <NavItem href="/search?popup=true" icon={<MagnifyingGlass size={24} />} label="검색" />
          <NavItem href="/chat" icon={<VideoCamera weight="fill" size={24} />} label="Live" />
          <NavItem href="/bookmark" icon={<BookmarkSimple weight="fill" size={24} />} label="북마크" />
          <NavItem href="/mypage" icon={<Image src={profileIcon} alt="" width={24} />} label="My" />
        </Suspense>
      </ul>
    </nav>
  );
};

export default NavBar;
