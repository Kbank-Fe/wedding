import { css } from '@emotion/react';

import { useWeddingStore } from '@/stores/useWeddingStore';
import { copyToLink } from '@/utils/clipboard';
import { loadKakaoSdk } from '@/utils/loadKakaoSdk';

const SHARE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;

const Footer = ({ shareId }: { shareId: string }) => {
  const nameList = useWeddingStore((state) => state.values.basicInfo);
  const date = useWeddingStore((state) => state.values.date);
  const picture = useWeddingStore(
    (state) => state.values.gallery.savedImageList?.[0],
  );

  const handleLinkShareClick = () => {
    copyToLink({ text: `${SHARE_URL}/${shareId}` });
  };

  const handleKakaoShareClick = async () => {
    const Kakao = await loadKakaoSdk();
    const title = `${nameList.maleName} ❤ ${nameList.femaleName} 저희 결혼합니다!💍`;
    const description = `${date.year}년 ${date.month}월 ${date.day}일 ${date.hour}시 ${date.min}분`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: picture?.url ?? `${SHARE_URL}/${shareId}`,
        link: {
          mobileWebUrl: `${SHARE_URL}/${shareId}`,
          webUrl: `${SHARE_URL}/${shareId}`,
        },
      },
    });
  };

  return (
    <div css={containerStyle}>
      <div css={buttonContainerStyle}>
        <button css={buttonStyle} onClick={handleKakaoShareClick}>
          카카오톡 공유
        </button>
        <button css={buttonStyle} onClick={handleLinkShareClick}>
          링크 공유
        </button>
      </div>
      <img alt="Us Day Logo" css={imageStyle} src="/images/logo.png" />
      <p css={fontStyle}>© usday. All rights reserved.</p>
    </div>
  );
};

const containerStyle = css`
  background-color: var(--gray2);
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  padding: 2.2rem 0 2.6rem;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const buttonStyle = css`
  width: 140px;
  padding: 0.8rem 1rem;
  background-color: var(--gray2);
  color: var(--gray11);
  border-radius: 8px;
  border: 1px solid var(--gray4);
  font-size: 12px;
  font-family: 'Wedding';
  font-weight: 700;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &:hover {
    background-color: var(--gray8);
    color: var(--gray1);
    border-color: var(--gray8);
  }

  &:active {
    background-color: var(--gray11);
    color: var(--gray1);
    border-color: var(--gray11);
  }
`;

const imageStyle = css`
  width: 60px;
`;

const fontStyle = css`
  font-size: 11px;
  font-weight: 400;
  color: var(--gray9);
`;

export default Footer;
