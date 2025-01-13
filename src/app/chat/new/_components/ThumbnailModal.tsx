import React, { useState } from "react";

interface ThumbnailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File | null) => void;
}

export const ThumbnailModal = ({ isOpen, onClose, onUpload }: ThumbnailModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    onUpload(selectedFile);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">사진 업로드</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            &times;
          </button>
        </div>
        <div className="mb-4 flex h-40 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">파일 끌어다 놓기</p>
          <p className="text-gray-500">또는</p>
          <button
            onClick={() => document.getElementById("fileInput")?.click()}
            className="mt-2 rounded bg-black px-4 py-2 text-white"
          >
            사진 찾아보기
          </button>
          <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>
        <p className="text-sm mb-4 text-gray-500">
          {selectedFile ? `선택된 파일: ${selectedFile.name}` : "선택된 파일 없음"}
        </p>
        <div className="flex justify-between">
          <button onClick={onClose} className="rounded bg-gray-300 px-4 py-2 text-gray-700">
            완료
          </button>
          <button onClick={handleUpload} className="rounded bg-black px-4 py-2 text-white">
            업로드
          </button>
        </div>
      </div>
    </div>
  );
};
