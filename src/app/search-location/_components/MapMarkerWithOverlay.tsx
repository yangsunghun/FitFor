"use client";

import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { CaretRight, X } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";

type MarkerProps = {
  marker: { id: string; lat: number; lng: number; title: string; thumb: string; place: string };
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
};

const MapMarkerWithOverlay = ({ marker, isActive, onClick, onClose }: MarkerProps) => {
  console.log(marker.id, isActive);
  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      document
        .querySelectorAll('div[style*="border: 1px solid rgb(118, 129, 168)"]')
        .forEach((element) => element.remove());
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <MapMarker
      position={{ lat: marker.lat, lng: marker.lng }}
      onClick={onClick}
      infoWindowOptions={{
        disableAutoPan: true, // 마커 클릭 시 지도 이동 방지
        removable: true, // 사용자가 직접 닫을 수 있도록 설정
        zIndex: -1 // 다른 요소보다 앞에 배치
      }}
    >
      {isActive && (
        <CustomOverlayMap position={{ lat: marker.lat, lng: marker.lng }} yAnchor={1.5} zIndex={1}>
          <div className="relative flex w-[300px] justify-between whitespace-normal rounded-2xl bg-white p-3">
            <button onClick={onClose} className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
              <X />
            </button>
            <figure className="thumbnail aspect-square w-[70px] rounded-lg bg-bg-02">
              <Image src={marker.thumb} alt={marker.title} fill sizes="70px" className="object-cover" />
            </figure>
            <div className="w-[calc(100%-85px)]">
              <p className="ellip1 text-caption text-text-03">{marker.place}</p>
              <p className="ellip2 text-caption font-medium">{marker.title}</p>
            </div>

            <Link
              href={`/detail/${marker.id}${isTabletOrSmaller ? "" : "/view"}`}
              className="absolute bottom-2 right-3 text-small"
            >
              자세히
              <CaretRight className="inline-block" />
            </Link>
          </div>
        </CustomOverlayMap>
      )}
    </MapMarker>
  );
};

export default MapMarkerWithOverlay;
