'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AddressModal from './_components/AddressModal';
import ThumbnailUpload from './_components/ThumbnailUpload';
import { useAuthStore } from "@/lib/store/authStore";
import { createClient } from "@/lib/utils/supabase/client";

const supabase = createClient();

const WritePage = () => {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [bodySize, setBodySize] = useState({ height: '', weight: '' });
  const [thumbnail, setThumbnail] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);

  // 게시글 저장 함수
  const handleSubmit = async () => {
    if (!title || !content || !address) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    if (!currentUser || !currentUser.id) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const post = {
        title,
        content,
        upload_place: address,
        created_at: new Date().toISOString(),
        user_id: currentUser.id,
        body_size: [parseFloat(bodySize.height) || 0, parseFloat(bodySize.weight) || 0],
        thumbnail: thumbnail || '',
        tags,
        comments: 0,
        likes: 0,
        view: 0,
      };

      const { error } = await supabase.from('posts').insert([post]);
      if (error) throw error;

      alert('저장 성공!');
      // 수정사항 ((중요))
      router.push('/'); // 상세페이지 리디렉션 기능 수정 필요
    } catch (error) {
      console.error('게시글 저장 실패:', error);
      alert('저장 실패');
    }
  };

  return (
    <div className="relative bg-white min-h-screen p-10">
      <div className="w-full max-w-[1200px] mx-auto border border-gray-300 rounded-md shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <button className="px-6 py-2 bg-gray-200 border border-gray-300 rounded-lg">
            임시저장
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-black text-white rounded-lg"
          >
            완료
          </button>
        </div>
        <div className="flex gap-8">
          <div className="w-1/2">
            <ThumbnailUpload
              thumbnail={thumbnail}
              onThumbnailUpload={setThumbnail}
            />
          </div>
          <div className="w-1/2 space-y-6">
            <div>
              <label className="block mb-2 font-bold">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="제목을 입력하세요."
              />
            </div>
            <div>
              <label className="block mb-2 font-bold">위치</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={address}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  placeholder="검색 버튼을 눌러 주소를 입력해주세요."
                />
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                  검색
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-bold">체형</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  value={bodySize.height}
                  onChange={(e) =>
                    setBodySize((prev) => ({ ...prev, height: e.target.value }))
                  }
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="키 (cm)"
                />
                <input
                  type="number"
                  value={bodySize.weight}
                  onChange={(e) =>
                    setBodySize((prev) => ({ ...prev, weight: e.target.value }))
                  }
                  className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="몸무게 (kg)"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <label className="block mb-2 font-bold">본문</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows={6}
            placeholder="본문 내용을 입력하세요."
          />
        </div>
      </div>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectAddress={setAddress}
      />
    </div>
  );
};

export default WritePage;