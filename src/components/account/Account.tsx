import { css } from '@emotion/react';
import { useState } from 'react';

import type { Account as AccountProps } from '@/types/wedding';
import { copyToClipboard } from '@/utils/clipboard';

const Account = ({
  bankName,
  accountNumber,
  accountHolder,
  isKakaopay,
  kakaopayUrl,
}: AccountProps) => {
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);
  const [kakaoButtonDisabled, setKakaoButtonDisabled] = useState(false);
  const showAccount = !!(bankName && accountNumber && accountHolder);

  const handleClickCopyButton = () => {
    if (copyButtonDisabled) return;

    setCopyButtonDisabled(true);
    copyToClipboard({ text: `${bankName} ${accountNumber}` });
    setTimeout(() => setCopyButtonDisabled(false), 2200);
  };

  const handleClickKakaoButton = () => {
    if (kakaoButtonDisabled) return;

    setKakaoButtonDisabled(true);

    window.open(kakaopayUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => setKakaoButtonDisabled(false), 2200);
  };

  return (
    <>
      {showAccount && (
        <div css={accountStyle}>
          <div css={accountInfoStyle}>
            <div css={accountHolderNameStyle}>{accountHolder ?? ''}</div>
            <div css={accountNumberStyle}>
              {bankName ?? ''} {accountNumber ?? ''}
            </div>
          </div>

          <div css={buttonGroupStyle}>
            <button
              css={copyButtonStyle}
              disabled={copyButtonDisabled}
              onClick={handleClickCopyButton}
            >
              복사
            </button>
            {isKakaopay && (
              <button
                css={kakaoButtonStyle}
                disabled={kakaoButtonDisabled}
                onClick={handleClickKakaoButton}
              >
                카카오송금
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const accountStyle = css`
  background-color: var(--gray1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const accountInfoStyle = css`
  display: flex;
  flex-direction: column;
`;

const accountHolderNameStyle = css`
  font-weight: bold;
  font-size: 0.85rem;
  margin-bottom: 4px;
`;

const accountNumberStyle = css`
  font-size: 0.75rem;
`;

const buttonGroupStyle = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 80px;
`;

const baseButtonStyle = css`
  font-size: 0.75rem;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
`;

const copyButtonStyle = css`
  ${baseButtonStyle};
  background-color: var(--blue9);
  color: var(--gray1);

  &:not(:disabled):hover {
    background-color: var(--blue11);
  }

  &:disabled {
    background-color: var(--gray5);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const kakaoButtonStyle = css`
  ${baseButtonStyle};
  background-color: var(--amber9);
  color: var(--gray12);
  font-weight: bold;

  &:hover {
    background-color: var(--amber10);
  }

  &:active {
    background-color: var(--amber11);
  }

  &:disabled {
    background-color: var(--amber6);
    color: var(--gray11);
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

export default Account;
