"use client";

import { REGIONS_WITH_QUERY } from "@/lib/constants/constants";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import useSdkLoad from "@/lib/hooks/location/useSdkLoad";
import { defaultClusterStyles } from "@/lib/styles/MarkerClusterStyles";
import type { PostType } from "@/lib/types/post";
import { useEffect, useState } from "react";
import { Map, MarkerClusterer } from "react-kakao-maps-sdk";
import MapMarkerWithOverlay from "./MapMarkerWithOverlay";

type KakaoMapProps = {
  posts: { items: PostType[]; total: number } | undefined;
  isPending: boolean;
};

const KakaoMap = ({ posts, isPending }: KakaoMapProps) => {
  const { query } = useLocationQuery();

  const selectedRegion = REGIONS_WITH_QUERY.find((region) => region.query === query);
  const center = selectedRegion ? { lat: selectedRegion.lat, lng: selectedRegion.lng } : { lat: 37.5665, lng: 126.978 };

  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  useSdkLoad(setIsSdkLoaded);

  const [markers, setMarkers] = useState<
    { id: string; lat: number; lng: number; title: string; thumb: string; place: string }[]
  >([]);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

  const handleToggleOverlay = (markerId: string) => {
    setActiveMarkerId(markerId);
  };

  const handleCloseOverlay = () => setActiveMarkerId(null);

  useEffect(() => {
    if (!isSdkLoaded || !posts || posts.total === 0 || typeof window === "undefined") return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    const geocodeAddress = (address: string): Promise<{ lat: number; lng: number }> => {
      return new Promise((resolve, reject) => {
        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === "OK" && result?.[0]) {
            resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
          } else {
            reject(new Error(`주소 변환 실패: ${address}, status: ${status}`));
          }
        });
      });
    };

    Promise.all(
      posts.items.map((post) => {
        if (!post.upload_place) return Promise.resolve(null);
        return geocodeAddress(post.upload_place)
          .then((coords) => ({
            ...coords,
            title: post.content,
            thumb: post.images[0],
            place: post.upload_place,
            id: String(post.id)
          }))
          .catch(() => null);
      })
    ).then((results) => {
      setMarkers(results.filter((marker): marker is (typeof markers)[number] => marker !== null));
    });
  }, [isSdkLoaded, posts, activeMarkerId]);

  return (
    <>
      {isSdkLoaded ? (
        <Map center={center} style={{ width: "100%", height: "100%" }} level={9}>
          <MarkerClusterer styles={defaultClusterStyles} averageCenter minLevel={9}>
            {markers.map((marker) => (
              <MapMarkerWithOverlay
                key={marker.id}
                marker={marker}
                isActive={activeMarkerId === marker.id}
                onClick={() => handleToggleOverlay(marker.id)}
                onClose={handleCloseOverlay}
              />
            ))}
          </MarkerClusterer>
        </Map>
      ) : (
        <div className="animate-pulse bg-gray-300" style={{ width: "100%", height: "100%" }}></div>
      )}
    </>
  );
};

export default KakaoMap;
