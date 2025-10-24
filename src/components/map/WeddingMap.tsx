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
        <MdLocationOn color="#87BBBA" size={24} />
      </div>

      <motion.div
        css={textStyle}
        initial="hidden"
        variants={containerVariants}
        viewport={{ amount: 0.5 }}
        whileInView="visible"
      >
        {mapInfo.venueName && (
          <h3>
            {mapInfo.venueName} {mapInfo.venueDetail}
          </h3>
        )}

        {mapInfo.address && (
          <>
            <p>{mapInfo.address}</p>

            {mapInfo.isMapVisible && (
              <>
                <KakaoMap
                  center={position}
                  level={3}
                  style={{
                    width: '100%',
                    height: '40vh',
                    margin: '3rem 0 2.5rem',
                  }}
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
  margin: 0 auto 1rem;
`;

const textStyle = css`
  text-align: center;
  color: var(--gray11);

  h3,
  h4 {
    font-weight: 500;
    margin-bottom: 0.2rem;
  }

  p {
    font-weight: 400;
    font-size: 15px;
    color: var(--gray10);
  }
`;

export default WeddingMap;
