import { css } from '@emotion/react';
import { useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'sonner';

import type { Account as AccountProps } from '@/types/wedding';
import { copyToClipboard } from '@/utils/clipboard';
import { Icons } from '@/utils/constants/images';

const useButtonCooldown = (delay = 2200) => {
  const [disabled, setDisabled] = useState(false);

  const trigger = (callback: () => void) => {
    if (disabled) return;
    setDisabled(true);
    callback();
    setTimeout(() => setDisabled(false), delay);
  };

  return { disabled, trigger };
};

const Account = ({
  bankName,
  accountNumber,
  accountHolder,
  isKakaopay,
  kakaopayUrl,
}: AccountProps) => {
  const showAccount = !!(bankName && accountNumber && accountHolder);

  const { trigger: triggerCopy } = useButtonCooldown();
  const { trigger: triggerKakao } = useButtonCooldown();

  const handleClickCopyButton = () =>
    triggerCopy(() => {
      copyToClipboard({ text: `${bankName} ${accountNumber}` });
    });

  const handleClickKakaoButton = () =>
    triggerKakao(() => {
      if ((kakaopayUrl ?? '').includes('https://qr.kakaopay.com')) {
        window.open(kakaopayUrl, '_blank', 'noopener,noreferrer');
      } else {
        toast.warning('송금 링크를 확인해 주세요.');
      }
    });

  if (!showAccount) return null;

  return (
    <div css={accountStyle}>
      <div css={accountRowStyle}>
        <div css={accountHolderStyle}>{accountHolder}</div>
        {isKakaopay && (
          <button css={kakaoButtonStyle} onClick={handleClickKakaoButton}>
            <img
              alt="카카오페이"
              css={kakaoPayImageStyle}
              src={Icons.kakaopay}
            />
          </button>
        )}
      </div>

      <div css={accountRowStyle}>
        <div css={accountTextStyle}>{bankName}</div>
        <div css={accountTextStyle}>{accountNumber}</div>
        <MdOutlineContentCopy
          aria-label="계좌번호 복사"
          css={copyIconStyle}
          size={12}
          onClick={handleClickCopyButton}
        />
      </div>
    </div>
  );
};

const accountStyle = css`
  background-color: var(--gray2);
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: space-between;
`;

const accountRowStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const textBase = css`
  margin-bottom: 2px;
`;

const accountHolderStyle = css`
  ${textBase};
  font-weight: bold;
  font-size: 0.85rem;
`;

const accountTextStyle = css`
  ${textBase};
  font-size: 0.8rem;
`;

const copyIconStyle = css`
  cursor: pointer;
`;

const kakaoButtonStyle = css`
  display: inline-flex;
  width: 40px;
  height: 20px;
`;

const kakaoPayImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default Account;
