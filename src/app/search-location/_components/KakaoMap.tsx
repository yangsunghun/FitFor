"use client";

import { REGIONS_WITH_QUERY } from "@/lib/constants/constants";
import useMediaQuery from "@/lib/hooks/common/useMediaQuery";
import { useLocationQuery } from "@/lib/hooks/location/useLocationQuery";
import useSdkLoad from "@/lib/hooks/location/useSdkLoad";
import type { PostType } from "@/lib/types/post";
import { CaretRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";

type KakaoMapProps = {
  posts: { items: PostType[]; total: number } | undefined;
  isPending: boolean;
};

const KakaoMap = ({ posts, isPending }: KakaoMapProps) => {
  const { query } = useLocationQuery();

  const isTabletOrSmaller = useMediaQuery("(max-width: 768px)");

  const selectedRegion = REGIONS_WITH_QUERY.find((region) => region.query === query);
  const center = selectedRegion ? { lat: selectedRegion.lat, lng: selectedRegion.lng } : { lat: 37.5665, lng: 126.978 };

  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  useSdkLoad(setIsSdkLoaded);

  const [markers, setMarkers] = useState<
    { id: string; lat: number; lng: number; title: string; thumb: string; place: string }[]
  >([]);
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);

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
        geocoder.addressSearch(address, (result: any, status: any) => {
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
              title: post.content,
              thumb: post.images[0],
              place: post.upload_place,
              id: String(post.id)
            };
            return marker;
          })
          .catch((error) => {
            return null;
          });
      })
    ).then((results) => {
      const validMarkers = results.filter(
        (marker): marker is { id: string; lat: number; lng: number; title: string; thumb: string; place: string } =>
          marker !== null
      );

      setMarkers(validMarkers);
    });
  }, [isSdkLoaded, posts]);

  return (
    <>
      {isSdkLoaded ? (
        <Map center={center} style={{ width: "100%", height: "100%" }} level={9}>
          {markers.map((marker) => (
            <MapMarker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => setActiveMarkerId((prev) => (prev === marker.id ? null : marker.id))}
            >
              {activeMarkerId === marker.id && (
                <CustomOverlayMap
                  position={{ lat: marker.lat, lng: marker.lng }}
                  yAnchor={1}
                  zIndex={1}
                  children={
                    <div className="relative flex w-[300px] justify-between whitespace-normal rounded-2xl bg-white p-3">
                      <figure className="thumbnail aspect-square w-[70px] rounded-lg bg-bg-02">
                        <Image
                          src={marker.thumb}
                          alt={marker.title}
                          fill={true}
                          sizes="(max-width: 768px) 108px, 108px"
                          className="object-cover"
                        />
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
                  }
                />
              )}
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
