import { css } from '@emotion/react';

type MapBadgeProps = {
  address: string;
  lat: number;
  lng: number;
};

const MapBadge = ({ address, lat, lng }: MapBadgeProps) => {
  const encodedName = encodeURIComponent(address);

  const naverUrl = `https://map.naver.com/v5/search/${encodedName}`;
  const kakaoUrl = `https://map.kakao.com/link/map/${encodedName},${lat},${lng}`;
  const tmapUrl = `https://apis.openapi.sk.com/tmap/app/routes?appKey=${import.meta.env.VITE_TMAP_APP_KEY}&name=${encodedName}&lon=${lng}&lat=${lat}`;

  return (
    <div css={containerStyle}>
      <a
        css={badgeStyle}
        href={naverUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt="네이버지도"
          css={iconStyle}
          src="/images/icon/naver_map.png"
        />
        네이버
      </a>

      <a
        css={badgeStyle}
        href={kakaoUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          alt="카카오내비"
          css={iconStyle}
          src="/images/icon/kakao_map.png"
        />
        카카오
      </a>
      <a
        css={badgeStyle}
        href={tmapUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img alt="티맵" css={iconStyle} src="/images/icon/tmap.png" />
        티맵
      </a>
    </div>
  );
};

const containerStyle = css`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 1rem;
  padding: 12px;
  background: var(--gray2);
  border-radius: 12px;
`;

const badgeStyle = css`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--gray1);
  font-size: 12px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: background 0.2s ease;

  &:hover {
    background: var(--gray3);
  }
`;

const iconStyle = css`
  width: 16px;
  height: 16px;
  object-fit: contain;
  flex-shrink: 0;
`;

export default MapBadge;
