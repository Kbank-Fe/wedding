import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import MapBadge from '@/components/map/MapBadge';
import Header from '@/components/shared/Header';

type LatLng = {
  lat: number;
  lng: number;
};

type WeddingMapProps = {
  address?: string;
};

const WeddingMap = ({ address = '서울 중구 을지로 170' }: WeddingMapProps) => {
  const [loading] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JS_KEY,
    libraries: ['services'],
  });

  const [position, setPosition] = useState<LatLng | null>(null);

  useEffect(() => {
    if (loading || !window.kakao?.maps) return;

    const { maps } = window.kakao;
    const geocoder = new maps.services.Geocoder();

    geocoder.addressSearch(address, (result, status) => {
      if (status === maps.services.Status.OK) {
        const { x, y } = result[0];
        setPosition({ lat: parseFloat(y), lng: parseFloat(x) });
      }
    });
  }, [address, loading]);

  if (!position) return null;

  return (
    <>
      <Header title="Location" />
      <h2 css={titleStyle}>{address}</h2>
      <Map
        center={position}
        level={3}
        style={{ width: '100%', height: '300px' }}
      >
        <MapMarker position={position}>{address}</MapMarker>
      </Map>
      <MapBadge address={address} lat={position.lat} lng={position.lng} />
    </>
  );
};

const titleStyle = css`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 1.8rem;
`;

export default WeddingMap;
