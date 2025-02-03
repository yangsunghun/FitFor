"use client";

import { REGIONS_WITH_QUERY } from "@/lib/constants/constants";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import useSdkLoad from "@/lib/hooks/location/useSdkLoad";
import type { PostType } from "@/lib/types/post";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

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

  const [markers, setMarkers] = useState<{ id: string; lat: number; lng: number; title: string }[]>([]);

  useEffect(() => {
    if (
      !isSdkLoaded ||
      typeof window === "undefined" ||
      !window.kakao ||
      !window.kakao.maps ||
      !window.kakao.maps.services ||
      !posts ||
      posts.total === 0
    ) {
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();

    // 주소를 좌표로 변환하는 함수
    const geocodeAddress = (address: string): Promise<{ lat: number; lng: number }> => {
      return new Promise((resolve, reject) => {
        console.log("[geocodeAddress] 요청 시작:", address);
        geocoder.addressSearch(address, (result: any, status: any) => {
          console.log("[geocodeAddress] 콜백 호출:", address, "status:", status, "result:", result);
          if (status === "OK" && result && result[0]) {
            resolve({ lat: parseFloat(result[0].y), lng: parseFloat(result[0].x) });
          } else {
            reject(new Error("주소 변환 실패: " + address + " status: " + status));
          }
        });
      });
    };

    // 모든 게시물에 대해 geocoding 요청
    Promise.all(
      posts.items.map((post) => {
        if (!post.upload_place) return Promise.resolve(null);
        return geocodeAddress(post.upload_place)
          .then((coords) => {
            const marker = {
              ...coords,
              title: post.upload_place!,
              id: String(post.id)
            };
            console.log("[Promise.all] geocoded marker:", marker);
            return marker;
          })
          .catch((error) => {
            console.error("[Promise.all] geocoding error for", post.upload_place, error);
            return null;
          });
      })
    ).then((results) => {
      const validMarkers = results.filter(
        (marker): marker is { id: string; lat: number; lng: number; title: string } => marker !== null
      );
      console.log("[Promise.all] Valid markers:", validMarkers);
      setMarkers(validMarkers);
    });
  }, [isSdkLoaded, posts]);

  useEffect(() => {
    if (!isSdkLoaded) return;
    console.log("window.kakao.maps.services:", window.kakao.maps.services);
  }, [isSdkLoaded]);

  console.log("markers", markers);

  return (
    <>
      {isSdkLoaded ? (
        <Map center={center} style={{ width: "100%", height: "100%" }} level={9}>
          {markers.map((marker) => (
            <MapMarker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }}>
              <div style={{ padding: "5px", color: "#000" }}>{marker.title}</div>
            </MapMarker>
          ))}
        </Map>
      ) : (
        <div style={{ width: "100%", height: "100%" }} className="animate-pulse bg-gray-300"></div>
      )}
    </>
  );
};

export default KakaoMap;
