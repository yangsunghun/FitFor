"use client";

import { Button } from "@/components/ui/Button";
import ModalItem from "@/components/ui/Modal";
import { getAddressFromCoordinates, getCurrentPosition } from "@/lib/utils/write/location";
import { CircleNotch, MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

type AddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (selectedAddress: string) => void;
};

const AddressModal = ({ isOpen, onClose, onSelectAddress }: AddressModalProps) => {
  // 모달 상태 관리: 검색어, 검색 결과, 로딩 상태, 에러 메시지 등을 포함
  const [state, setState] = useState({
    searchTerm: "", // 사용자가 입력한 검색어
    searchResults: [] as string[], // 검색 결과 리스트
    loading: false, // 검색 로딩 상태
    geoLoading: false, // 현재 위치 로딩 상태
    errorMessage: "" // 에러 메시지
  });

  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  // 입력 필드 변경 핸들러: 입력된 값을 상태에 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // 상태 초기화 함수 (모달이 닫힐 때 호출)
  const resetForm = () => {
    setState({
      searchTerm: "",
      searchResults: [],
      loading: false,
      geoLoading: false,
      errorMessage: ""
    });
  };

  // 모달이 열릴 때 상태 초기화
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  // 주소 검색 처리 함수
  const handleSearch = async () => {
    if (!state.searchTerm.trim()) return; // 검색어가 없으면 종료

    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${state.searchTerm}`;
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${apiKey}`
        }
      });
      const data = await response.json();

      if (data.documents.length > 0) {
        // 검색 결과가 있을 경우 상태 업데이트
        const results = data.documents.map((doc: { address_name: string }) => doc.address_name);
        setState((prevState) => ({ ...prevState, searchResults: results }));
      } else {
        // 검색 결과가 없을 경우 상태 업데이트
        setState((prevState) => ({ ...prevState, searchResults: ["검색 결과가 없습니다."] }));
      }
    } catch (error) {
      console.error("주소 검색 실패:", error); // 에러 로깅
      setState((prevState) => ({ ...prevState, searchResults: ["검색 중 오류가 발생했습니다."] }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false })); // 로딩 상태 비활성화
    }
  };

  // 현재 위치 가져오기 처리 함수
  const handleGetCurrentLocation = async () => {
    try {
      setState((prevState) => ({ ...prevState, geoLoading: true })); // 현재 위치 로딩 상태 활성화
      const { lat, lng } = await getCurrentPosition(); // 현재 위치 좌표 가져오기
      const address = await getAddressFromCoordinates(lat, lng, apiKey!); // 좌표로 주소 변환
      onSelectAddress(address); // 부모 컴포넌트로 주소 전달
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("위치 확인 실패:", error); // 에러 로깅
      setState((prevState) => ({ ...prevState, errorMessage: "현재 위치를 가져오는 중 오류가 발생했습니다." }));
    } finally {
      setState((prevState) => ({ ...prevState, geoLoading: false })); // 로딩 상태 비활성화
    }
  };

  // 모달이 닫혀 있으면 렌더링 X
  if (!isOpen) return null;

  return (
    <ModalItem isOpen={isOpen} onClose={onClose}>
      {/* 모달 제목 */}
      <h2 className="mb-6 items-center font-bold text-title2">위치 찾기</h2>

      {/* 검색 입력 필드 */}
      <div className="relative w-[30vw] max-w-full">
        <div className="absolute inset-y-0 left-3 flex items-center">
          <MagnifyingGlass size={24} className="text-text-03" />
        </div>
        <input
          type="text"
          name="searchTerm"
          value={state.searchTerm}
          onChange={handleInputChange}
          placeholder="주소 입력 (예: 서초동)"
          className="w-full rounded-lg bg-bg-02 p-4 pl-12 pr-10 text-body text-text-03 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <button
            onClick={handleGetCurrentLocation}
            className="flex items-center justify-center text-text-03"
            disabled={state.geoLoading}
          >
            {state.geoLoading ? <CircleNotch className="text-primary h-6 w-6 animate-spin tb:h-6 tb:w-6" /> : <MapPin size={24} />}
          </button>
        </div>
      </div>

      {/* 검색 결과 목록 */}
      <ul className="mt-4 max-h-60 overflow-y-auto rounded-md bg-bg-02 text-text-03">
        {state.searchResults.map((result, index) => (
          <li
            key={index}
            className="cursor-pointer bg-bg-02 p-3 text-text-03 hover:text-text-04"
            onClick={() => {
              if (result !== "검색 결과가 없습니다." && result !== "검색 중 오류가 발생했습니다.") {
                onSelectAddress(result);
                onClose();
              }
            }}
          >
            {result}
          </li>
        ))}
      </ul>

      {/* 검색 버튼 */}
      <Button onClick={handleSearch} className="mt-6 w-full" disabled={state.loading}>
        {state.loading ? "검색 중..." : "검색"}
      </Button>
    </ModalItem>
  );
};

export default AddressModal;
