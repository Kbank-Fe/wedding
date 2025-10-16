import { css } from '@emotion/react';
import { useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';

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
      window.open(kakaopayUrl, '_blank', 'noopener,noreferrer');
    });

  if (!showAccount) return null;

  return (
    <div css={accountStyle}>
      <div css={accountRowStyle}>
        <h4>{accountHolder}</h4>
        {isKakaopay && kakaopayUrl && (
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
        <p>
          {bankName} {accountNumber}
        </p>
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
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const accountRowStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;

  h4 {
    font-size: 12px;
    font-weight: 700;
    color: var(--gray11);
  }

  p {
    font-size: 11px;
    margin-bottom: 2px;
    color: var(--gray10);
  }
`;

const copyIconStyle = css`
  color: var(--gray10);
  cursor: pointer;
`;

const kakaoButtonStyle = css`
  display: inline-flex;
  width: 35px;
`;

const kakaoPayImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default Account;
