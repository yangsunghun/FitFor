"use client";
import React, { useState } from "react";
import sampleImage from "../../assets/images/image_sample.png";
import Image from "next/image";
import Masonry from "react-layout-masonry";
import { mock_data } from "./mock_data";

const MainPage = () => {
  const [isMasonry, setIsMasonry] = useState(false);

  const toggleLayout = () => {
    setIsMasonry((prev) => !prev);
  };

  return (
    <>
      <div className="mx-auto w-full max-w-[1200px]">
        <section>
          <ul className="my-10 flex">
            <li>
              <button className="rounded-full border border-gray-500 px-[15px]">분류1</button>
            </li>
            <li>
              <button className="rounded-full border border-gray-500 px-[15px]">분류2</button>
            </li>
            <li>
              <button className="rounded-full border border-gray-500 px-[15px]">분류3</button>
            </li>
            <li>
              <button className="rounded-full border border-gray-500 px-[15px]">분류4</button>
            </li>
          </ul>
        </section>
        <section>
          <div>
            <div
              onClick={toggleLayout}
              className={`relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full transition-all duration-300 ${
                isMasonry ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                  isMasonry ? "translate-x-6" : "translate-x-1"
                }`}
              ></div>
              <div
                className="absolute inset-0 flex items-center justify-between px-1 text-xs font-medium text-white"
                style={{ pointerEvents: "none" }}
              ></div>
            </div>
          </div>
          {isMasonry ? (
            <Masonry columns={{ 1200: 4, 768: 3, 480: 2 }} gap={16} className="flex">
              {mock_data.map((item, index) => (
                <div key={index} className="masonry-item">
                  <figure className="relative w-full">
                    <Image src={item.image} alt={item.title} width={500} height={500} />
                  </figure>
                  <div>
                    <p>{item.title}</p>
                    <p>
                      <span>조회수: {item.viewCount}</span> <span>{item.createdAt}</span>
                    </p>
                    <p>{item.tags.join(", ")}</p>
                    <div>
                      <button>좋아요 {item.likes}</button>
                      <button>댓글 {item.comments}</button>
                      <button>북마크 {item.bookmarks}</button>
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          ) : (
            <ul className="flex flex-wrap">
              {mock_data.map((item, index) => (
                <li key={index} className="mt-5 flex w-[48%] items-center gap-[20px]">
                  <figure>
                    <Image src={sampleImage} alt={item.title} width={150} height={150} />
                  </figure>
                  <div>
                    <p>{item.title}</p>
                    <p>
                      <span>조회수: {item.viewCount}</span> <span>{item.createdAt}</span>
                    </p>
                    <p>{item.tags.join(", ")}</p>
                    <div>
                      <button>좋아요 {item.likes}</button>
                      <button>댓글 {item.comments}</button>
                      <button>북마크 {item.bookmarks}</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default MainPage;
