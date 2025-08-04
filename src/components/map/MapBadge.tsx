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
  justify-content: space-around;
  gap: 6px;
  margin-top: 1rem;
  padding: 0.8rem;
  background: var(--gray2);
  border-radius: 0.8rem;

  @media (max-width: 360px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const badgeStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0.4rem 1rem;
  border-radius: 1.5rem;
  background: var(--gray1);
  font-size: 0.8rem;
  color: var(--gray12);
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: background 0.2s ease;

  &:hover {
    background: var(--gray3);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 360px) {
    width: 100%;
  }

  @media (min-width: 481px) and (max-width: 767px) {
    padding: 0.5rem 2rem;
    gap: 5px;
  }

  @media (min-width: 768px) {
    padding: 0.6rem 2rem;
    gap: 6px;
  }
`;

const iconStyle = css`
  width: 1rem;
  height: 1rem;
  object-fit: contain;

  @media (min-width: 481px) and (max-width: 767px) {
    width: 1.1rem;
    height: 1.1rem;
  }

  @media (min-width: 768px) {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export default MapBadge;
