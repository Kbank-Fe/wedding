import { useEffect, useRef, useState } from 'react';

import type {
  Geocoder,
  KakaoGeocode,
  KakaoStatus,
  KakaoWindow,
  LatLng,
} from '@/types/map.types';

export function useGeocode(address: string, loading: boolean) {
  const [position, setPosition] = useState<LatLng | null>(null);
  const geocoderRef = useRef<Geocoder | null>(null);

  useEffect(() => {
    if (loading || geocoderRef.current) return;

    const service = (window as KakaoWindow).kakao?.maps?.services;
    if (!service) return;

    geocoderRef.current = new service.Geocoder();
  }, [loading]);

  useEffect(() => {
    if (loading || !geocoderRef.current) return;

    const addr = address.trim();
    if (!addr) return;

    geocoderRef.current.addressSearch(
      addr,
      (res: KakaoGeocode[], status: KakaoStatus) => {
        if (status !== 'OK' || !res[0]) return;
        const { x, y } = res[0];
        setPosition({ lat: Number(y), lng: Number(x) });
      },
    );
  }, [address, loading]);

  return position;
}
