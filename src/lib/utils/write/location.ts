export const getCurrentPosition = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation을 지원하지 않는 브라우저입니다."));
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        resolve({ lat: latitude, lng: longitude });
      },
      (err) => {
        reject(err);
      }
    );
  });
};

export const getAddressFromCoordinates = async (lat: number, lng: number, apiKey: string): Promise<string> => {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${apiKey}`
      }
    });
    const data = await response.json();

    if (data.documents.length > 0) {
      const { region_1depth_name, region_2depth_name, region_3depth_name } = data.documents[0].address;
      return `${region_1depth_name} ${region_2depth_name} ${region_3depth_name}`;
    } else {
      return "주소 정보 없음";
    }
  } catch (error) {
    console.error("주소 조회 실패:", error);
    throw new Error("주소 조회 실패");
  }
};
