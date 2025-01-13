import { createClient } from "@/lib/utils/supabase/client";
import Image from "next/image";
import { useState } from "react";

const supabase = createClient();

type ProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddProduct: (product: {
        title: string;
        description: string;
        price: number;
        imageUrl: string;
    }) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const PurchaseModal = ({ isOpen, onClose, onAddProduct }: ProductModalProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [imageUrl, setImageUrl] = useState<string>("");

    const uploadImage = async (file: File): Promise<string> => {
        try {
            if (file.size > MAX_FILE_SIZE) {
                throw new Error("파일 크기는 5MB 이하만 업로드할 수 있습니다.");
            }

            const timestamp = Date.now();
            const extension = file.name.split(".").pop() || "unknown";
            const uniqueFileName = `${timestamp}.${extension}`;
            const filePath = `purchase/${uniqueFileName}`;

            const { error } = await supabase.storage
                .from("post-images")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) throw new Error(`이미지 업로드 실패: ${error.message}`);

            const { publicUrl } = supabase.storage
                .from("post-images")
                .getPublicUrl(filePath).data;

            if (!publicUrl) throw new Error("이미지 URL 생성 실패");

            return publicUrl;
        } catch (error) {
            console.error("이미지 업로드 오류:", error);
            throw error;
        }
    };

    const handleImageUpload = () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = async (e: any) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const url = await uploadImage(file);
                    setImageUrl(url);
                } catch (error: any) {
                    alert(error.message);
                }
            }
        };
        fileInput.click();
    };

    const handleSubmit = () => {
        if (!title || !description || !price || !imageUrl) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        onAddProduct({ title, description, price: Number(price), imageUrl });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">상품 정보 입력</h2>

                {/* 이미지 업로드 */}
                <div className="mb-4">
                    <label className="block font-bold mb-2">상품 이미지</label>
                    <div
                        className="w-32 h-32 border border-gray-300 flex items-center justify-center rounded-lg cursor-pointer"
                        onClick={handleImageUpload}
                    >
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt="Uploaded"
                                width={128} // 이미지 상자의 너비 (w-32 = 8rem = 128px)
                                height={128} // 이미지 상자의 높이 (h-32 = 8rem = 128px)
                                objectFit="cover" // 이미지를 상자 크기에 맞게 잘라서 표시
                                className="rounded-lg"
                            />
                        ) : (
                            <span className="text-gray-400">+ 추가</span>
                        )}
                    </div>
                </div>

                {/* 상품명 */}
                <div className="mb-4">
                    <label className="block font-bold mb-2">상품명</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="상품명을 입력해주세요."
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                {/* 설명 */}
                <div className="mb-4">
                    <label className="block font-bold mb-2">설명</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="상품의 설명을 작성해주세요."
                        className="w-full p-2 border rounded-md"
                    ></textarea>
                </div>

                {/* 가격 */}
                <div className="mb-4">
                    <label className="block font-bold mb-2">가격</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        placeholder="상품의 가격을 입력해주세요."
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                {/* 버튼 */}
                <div className="flex justify-end gap-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        onClick={onClose}
                    >
                        취소
                    </button>
                    <button
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                        onClick={handleSubmit}
                    >
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PurchaseModal;