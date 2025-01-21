"use client";
import profileIcon from "@/assets/images/profile.svg";
import { BookmarkSimple, House, MagnifyingGlass, VideoCamera } from "@phosphor-icons/react";
import Image from "next/image";
import NavItem from "./NavItem";

const NavBar = () => {
  return (
    <nav className="fixed bottom-0 z-50 hidden w-full bg-bg-01 pb-7 text-small text-text-02 tb:block">
      <ul className="flex justify-between">
        <NavItem href="/home" icon={<House weight="fill" size={24} />} label="홈" />
        <NavItem href="/search" icon={<MagnifyingGlass size={24} />} label="검색" />
        <NavItem href="/chat" icon={<VideoCamera weight="fill" size={24} />} label="Live" />
        <NavItem href="/bookmark" icon={<BookmarkSimple weight="fill" size={24} />} label="북마크" />
        <NavItem href="/mypage" icon={<Image src={profileIcon} alt="" width={24} />} label="My" />
      </ul>
    </nav>
  );
};

export default NavBar;
