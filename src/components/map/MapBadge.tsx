import { css } from '@emotion/react';

import { MapIcons } from '@/utils/constants/images';
import { MapUrls } from '@/utils/constants/urls';

type MapBadgeProps = {
  address: string;
  lat: number;
  lng: number;
};

const MapBadge = ({ address, lat, lng }: MapBadgeProps) => {
  const encodedName = encodeURIComponent(address);

  const naverUrl = `${MapUrls.naver}/${encodedName}`;
  const kakaoUrl = `${MapUrls.kakao}/${encodedName},${lat},${lng}`;
  const tmapUrl = `${MapUrls.tmap}?appKey=${import.meta.env.VITE_TMAP_APP_KEY}&name=${encodedName}&lon=${lng}&lat=${lat}`;

  return (
    <div css={containerStyle}>
      <a
        css={badgeStyle}
        href={naverUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt="네이버지도" css={iconStyle} src={MapIcons.naver} />
        네이버
      </a>

      <a
        css={badgeStyle}
        href={kakaoUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt="카카오내비" css={iconStyle} src={MapIcons.kakao} />
        카카오
      </a>

      <a
        css={badgeStyle}
        href={tmapUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt="티맵" css={iconStyle} src={MapIcons.tmap} />
        티맵
      </a>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  justify-content: center;
  gap: 3.2rem;
`;

const badgeStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--gray9);
`;

const iconStyle = css`
  width: 2rem;
  height: 2rem;
  border-radius: 5px;
`;

export default MapBadge;
