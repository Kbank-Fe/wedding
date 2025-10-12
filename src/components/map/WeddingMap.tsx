import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { MdLocationOn } from 'react-icons/md';
import {
  Map as KakaoMap,
  MapMarker,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';

import MapBadge from '@/components/map/MapBadge';
import { useGeocode } from '@/hooks/useGeocode';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { LatLng } from '@/types/map.types';

const WeddingMap = () => {
  const mapInfo = useWeddingStore((state) => state.values.map);
  const [loading] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_JS_KEY,
    libraries: ['services'],
  });

  const position: LatLng | null = useGeocode(mapInfo.address, loading);

  if (!position) return null;

  return (
    <>
      <div css={headerStyle}>
        <MdLocationOn size={24} />
      </div>

      <motion.div
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.5 }}
        whileInView="visible"
      >
        {mapInfo.title && <h3 css={titleStyle}>{mapInfo.title}</h3>}

        {mapInfo.venueName && (
          <p css={venueInfoStyle}>
            {mapInfo.venueName} {mapInfo.venueDetail}
          </p>
        )}

        {mapInfo.address && (
          <>
            <p css={addressStyle}>{mapInfo.address}</p>

            {mapInfo.isMapVisible && (
              <>
                <KakaoMap
                  center={position}
                  level={3}
                  style={{ width: '100%', height: '40vh' }}
                >
                  <MapMarker position={position} title="예식 장소" />
                </KakaoMap>
                <MapBadge
                  address={mapInfo.address}
                  lat={position.lat}
                  lng={position.lng}
                />
              </>
            )}
          </>
        )}
      </motion.div>
    </>
  );
};

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const;

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--teal7);
  margin-bottom: 1rem;
`;

const titleStyle = css`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const venueInfoStyle = css`
  text-align: center;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--gray12);
`;

const addressStyle = css`
  text-align: center;
  font-size: 0.9rem;
  margin-bottom: 1.2rem;
  color: var(--gray10);
`;

export default WeddingMap;
