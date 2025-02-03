import { REGIONS_WITH_QUERY } from "@/lib/constants/constants";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import useSdkLoad from "@/lib/hooks/location/useSdkLoad";
import Script from "next/script";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const KakaoMap = () => {
  const { query } = useLocationQuery();

  const selectedRegion = REGIONS_WITH_QUERY.find((region) => region.query === query);
  const center = selectedRegion ? { lat: selectedRegion.lat, lng: selectedRegion.lng } : { lat: 37.5665, lng: 126.978 };

  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_SHARE_API_KEY}&autoload=false`;

  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  useSdkLoad(setIsSdkLoaded);

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="afterInteractive" />
      {isSdkLoaded ? (
        <Map center={center} style={{ width: "100%", height: "100%" }} level={7}>
          {selectedRegion && (
            <MapMarker position={center}>
              <div style={{ padding: "5px", color: "#000" }}>{selectedRegion.title}</div>
            </MapMarker>
          )}
        </Map>
      ) : (
        <div style={{ width: "100%", height: "100%" }} className="animate-pulse bg-gray-300"></div>
      )}
    </>
  );
};

export default KakaoMap;
