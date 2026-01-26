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
  const showAccount = Boolean(
    bankName?.trim() || accountNumber?.trim() || accountHolder?.trim(),
  );

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

      <button
        aria-label={`${bankName} ${accountNumber} 계좌번호 복사`}
        css={accountButtonStyle}
        type="button"
        onClick={handleClickCopyButton}
      >
        <span>
          {bankName} {accountNumber}
        </span>
        <MdOutlineContentCopy
          aria-hidden="true"
          css={copyIconStyle}
          size={12}
        />
      </button>
    </div>
  );
};

const accountStyle = css`
  display: flex;
  gap: 4px;
  justify-content: space-between;
`;

const flexCenterStyle = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const accountButtonStyle = css`
  /* 버튼 기본 스타일 제거 */
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  cursor: pointer;

  ${flexCenterStyle}

  span {
    font-size: 11px;
    margin-bottom: 2px;
    color: var(--gray10);
  }
`;

const accountRowStyle = css`
  ${flexCenterStyle}

  h4 {
    font-size: 12px;
    font-weight: 700;
    color: var(--gray11);
  }
`;

const copyIconStyle = css`
  color: var(--gray10);
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
