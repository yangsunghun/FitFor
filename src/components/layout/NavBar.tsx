"use client";
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
          <NavItem
            href="/mypage"
            location="/mypage"
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.50018 21C4.50018 21 3.00018 21 3.00018 19.5C3.00018 18 4.50018 13.5 12.0002 13.5C19.5002 13.5 21.0002 18 21.0002 19.5C21.0002 21 19.5002 21 19.5002 21H4.50018ZM12.0002 12C13.1937 12 14.3383 11.5259 15.1822 10.682C16.0261 9.83807 16.5002 8.69347 16.5002 7.5C16.5002 6.30653 16.0261 5.16193 15.1822 4.31802C14.3383 3.47411 13.1937 3 12.0002 3C10.8067 3 9.66212 3.47411 8.8182 4.31802C7.97429 5.16193 7.50018 6.30653 7.50018 7.5C7.50018 8.69347 7.97429 9.83807 8.8182 10.682C9.66212 11.5259 10.8067 12 12.0002 12V12Z"
                  fill="currentColor"
                />
              </svg>
            }
            label="My"
          />
        </Suspense>
      </ul>
    </nav>
  );
};

export default NavBar;
