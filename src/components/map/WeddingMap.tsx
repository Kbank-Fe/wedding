import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import AddressSearch from '@/components/map/AddressSearch';
import MapBadge from '@/components/map/MapBadge';
import Header from '@/components/shared/Header';
import type {
  Geocoder,
  KakaoGeocode,
  KakaoStatus,
  KakaoWindow,
  LatLng,
  WeddingMapProps,
} from '@/types/map.types';

const DEFAULT_ADDRESS = '서울 중구 을지로 170';

export default function WeddingMap({
  address = DEFAULT_ADDRESS,
}: WeddingMapProps) {
  const [loading] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JS_KEY,
    libraries: ['services'],
  });

  const [currentAddress, setCurrentAddress] = useState(address);
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

    const addr = currentAddress.trim();
    if (!addr) return;

    geocoderRef.current.addressSearch(
      addr,
      (res: KakaoGeocode[], status: KakaoStatus) => {
        if (status !== 'OK' || !res[0]) return;
        const { x, y } = res[0];
        setPosition({ lat: Number(y), lng: Number(x) });
      },
    );
  }, [currentAddress, loading]);

  if (!position) return null;

  return (
    <>
      <Header title="Location" />
      <motion.div
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.5 }}
        whileInView="visible"
      >
        <h3 css={titleStyle}>{currentAddress}</h3>
        <Map
          center={position}
          level={3}
          style={{ width: '100%', height: '40vh' }}
        >
          <MapMarker position={position} title="예식 장소" />
        </Map>
        <MapBadge
          address={currentAddress}
          lat={position.lat}
          lng={position.lng}
        />
      </motion.div>

      <AddressSearch
        buttonText="주소 검색"
        disabled={loading}
        onSelect={setCurrentAddress}
      />
    </>
  );
}

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

const titleStyle = css`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1.8rem;
`;
