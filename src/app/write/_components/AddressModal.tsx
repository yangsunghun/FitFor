import { useState } from 'react';
import { getAddressFromCoordinates, getCurrentPosition } from '../_utils/location';

type AddressModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (selectedAddress: string) => void;
};

const AddressModal = ({ isOpen, onClose, onSelectAddress }: AddressModalProps) => {
  const [state, setState] = useState({
    searchTerm: '',
    searchResults: [] as string[],
    loading: false,
    geoLoading: false,
    errorMessage: '',
  });

  const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    if (!state.searchTerm.trim()) return;

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
        const results = data.documents.map((doc: { address_name: string }) => doc.address_name);
        setState((prevState) => ({ ...prevState, searchResults: results }));
      } else {
        setState((prevState) => ({ ...prevState, searchResults: ['검색 결과가 없습니다.'] }));
      }
    } catch (error) {
      console.error('주소 검색 실패:', error);
      setState((prevState) => ({ ...prevState, searchResults: ['검색 중 오류가 발생했습니다.'] }));
    } finally {
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const handleGetCurrentLocation = async () => {
    try {
      setState((prevState) => ({ ...prevState, geoLoading: true }));
      const { lat, lng } = await getCurrentPosition();
      const address = await getAddressFromCoordinates(lat, lng, apiKey!);
      onSelectAddress(address);
      onClose();
    } catch (error) {
      console.error('위치 확인 실패:', error);
      setState((prevState) => ({ ...prevState, errorMessage: '현재 위치를 가져오는 중 오류가 발생했습니다.' }));
    } finally {
      setState((prevState) => ({ ...prevState, geoLoading: false }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">주소 검색</h2>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center">
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
            name="searchTerm"
            value={state.searchTerm}
            onChange={handleInputChange}
            placeholder="주소 입력 (예: 서초동)"
            className="w-full p-3 pl-10 border rounded-md focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full p-3 mt-2 bg-black text-white rounded-md"
          disabled={state.loading}
        >
          {state.loading ? '검색 중...' : '검색'}
        </button>

        <ul className="mt-4 border rounded-md max-h-60 overflow-y-auto">
          {state.searchResults.map((result, index) => (
            <li
              key={index}
              className="p-3 border-b cursor-pointer hover:bg-gray-100 text-gray-700"
              onClick={() => {
                if (result !== '검색 결과가 없습니다.' && result !== '검색 중 오류가 발생했습니다.') {
                  onSelectAddress(result);
                  onClose();
                }
              }}
            >
              {result}
            </li>
          ))}
        </ul>

        <button
          onClick={handleGetCurrentLocation}
          className="w-full p-3 bg-black text-white rounded-md mt-4"
          disabled={state.geoLoading}
        >
          {state.geoLoading ? '현재 위치 가져오는 중...' : '현재 위치 가져오기'}
        </button>
        {state.errorMessage && <p className="text-red-500 text-sm">{state.errorMessage}</p>}

        <button
          onClick={onClose}
          className="w-full p-3 mt-4 bg-gray-500 text-white rounded-md"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AddressModal;