import { css } from '@emotion/react';
import { toast } from 'sonner';

import { useWeddingStore } from '@/stores/useWeddingStore';
import { copyToLink } from '@/utils/clipboard';
import { loadKakaoSdk } from '@/utils/loadKakaoSdk';

const SHARE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;

const Footer = ({ shareId }: { shareId: string }) => {
  const activeCheckbox = useWeddingStore(
    (state) => state.values.activeCheckbox.share,
  );
  const shareInfo = useWeddingStore((state) => state.values.share);

  const validateShareId = () => {
    if (!shareId) return false;
    if (shareId.includes('kakao')) {
      toast.error('미리보기 중에는 확인할 수 없어요.');
      return false;
    }

    return true;
  };

  const handleLinkShareClick = () => {
    if (!validateShareId()) return;
    copyToLink({ text: `${SHARE_URL}/${shareId}` });
  };

  const handleKakaoShareClick = async () => {
    if (!validateShareId()) return;
    const Kakao = await loadKakaoSdk();

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: shareInfo.title ?? '',
        description: shareInfo.description ?? '',
        imageUrl:
          shareInfo.savedImageList?.[0].url ?? `${SHARE_URL}/${shareId}`,
        link: {
          mobileWebUrl: `${SHARE_URL}/${shareId}`,
          webUrl: `${SHARE_URL}/${shareId}`,
        },
      },
    });
  };

  const shareOptions = [
    {
      key: 'kakao',
      enabled: shareInfo?.kakaoShare,
      label: '카카오톡 공유',
      onClick: handleKakaoShareClick,
    },
    {
      key: 'link',
      enabled: shareInfo?.linkShare,
      label: '링크 공유',
      onClick: handleLinkShareClick,
    },
  ].filter((opt) => opt.enabled);

  return (
    <div css={containerStyle}>
      {activeCheckbox && shareOptions.length > 0 && (
        <div css={buttonContainerStyle}>
          {shareOptions.map(({ key, label, onClick }) => (
            <button key={key} css={buttonStyle} onClick={onClick}>
              {label}
            </button>
          ))}
        </div>
      )}
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
