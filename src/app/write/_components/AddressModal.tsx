import { useEffect, useState } from 'react';
import { getAddressFromCoordinates, getCurrentPosition } from '../_utils/location';

type AddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (selectedAddress: string) => void;
};

const AddressModal = ({ isOpen, onClose, onSelectAddress }: AddressModalProps) => {
  const [state, setState] = useState({
    searchTerm: '', // 사용자가 입력한 검색어
    searchResults: [] as string[], // 검색 결과 리스트
    loading: false, // 검색 로딩 상태
    geoLoading: false, // 현재 위치 로딩 상태
    errorMessage: '', // 에러 메시지
  });

  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  // 입력 필드 변경 핸들러: 입력된 값을 상태에 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 상태 초기화 함수 (모달이 닫힐 때 호출)
  const resetForm = () => {
    setState({
      searchTerm: '',
      searchResults: [],
      loading: false,
      geoLoading: false,
      errorMessage: '',
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
          Authorization: `KakaoAK ${apiKey}`,
        },
      });
      const data = await response.json();

      if (data.documents.length > 0) {
        // 검색 결과가 있을 경우 상태 업데이트
        const results = data.documents.map((doc: { address_name: string }) => doc.address_name);
        setState((prevState) => ({ ...prevState, searchResults: results }));
      } else {
        // 검색 결과가 없을 경우 상태 업데이트
        setState((prevState) => ({ ...prevState, searchResults: ['검색 결과가 없습니다.'] }));
      }
    } catch (error) {
      console.error('주소 검색 실패:', error); // 에러 로깅
      setState((prevState) => ({ ...prevState, searchResults: ['검색 중 오류가 발생했습니다.'] }));
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
      console.error('위치 확인 실패:', error); // 에러 로깅
      setState((prevState) => ({ ...prevState, errorMessage: '현재 위치를 가져오는 중 오류가 발생했습니다.' }));
    } finally {
      setState((prevState) => ({ ...prevState, geoLoading: false })); // 로딩 상태 비활성화
    }
  };

  // 모달이 닫혀 있으면 렌더링 X
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">주소 검색</h2>

        {/* 검색 입력 필드 */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
            {/* 돋보기 아이콘 */}
            <svg
              className="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            name="searchTerm" // 상태와 연결된 name 속성
            value={state.searchTerm}
            onChange={handleInputChange}
            placeholder="주소 입력 (예: 서초동)"
            className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-black"
          />
        </div>

        {/* 검색 버튼 */}
        <button
          onClick={handleSearch}
          className="w-full p-3 mt-2 bg-black text-white rounded-md"
          disabled={state.loading}
        >
          {state.loading ? '검색 중...' : '검색'}
        </button>

        {/* 검색 결과 목록 */}
        <ul className="mt-4 border rounded-md max-h-60 overflow-y-auto">
          {state.searchResults.map((result, index) => (
            <li
              key={index}
              className="p-3 border-b cursor-pointer hover:bg-gray-100 text-gray-700"
              onClick={() => {
                if (result !== '검색 결과가 없습니다.' && result !== '검색 중 오류가 발생했습니다.') {
                  onSelectAddress(result); // 선택된 주소 전달
                  onClose(); // 모달 닫기
                }
              }}
            >
              {result}
            </li>
          ))}
        </ul>

        {/* 현재 위치 가져오기 버튼 */}
        <button
          onClick={handleGetCurrentLocation}
          className="w-full p-3 bg-black text-white rounded-md mt-4"
          disabled={state.geoLoading}
        >
          {state.geoLoading ? '현재 위치 가져오는 중...' : '현재 위치 가져오기'}
        </button>

        {/* 에러 메시지 */}
        {state.errorMessage && <p className="text-red-500 text-sm">{state.errorMessage}</p>}

        {/* 닫기 버튼 */}
        <button
          onClick={onClose} // 상태 초기화 및 모달 닫기
          className="w-full p-3 mt-4 bg-gray-500 text-white rounded-md"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AddressModal;