import { css } from '@emotion/react';
import { useState } from 'react';

import { copyToClipboard } from '@/utils/clipboard';

type AccountProps = {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
};

const Account = ({ bankName, accountNumber, accountHolder }: AccountProps) => {
  const [copyButtonDisabled, setCopyButtonDisabled] = useState(false);
  const handleClickCopyButton = () => {
    if (copyButtonDisabled) return;

    setCopyButtonDisabled(true);
    copyToClipboard({ text: `${bankName} ${accountNumber}` });
    setTimeout(() => setCopyButtonDisabled(false), 2200);
  };

  return (
    <div css={accountStyle}>
      <div css={accountInfoStyle}>
        <div css={accountHolderNameStyle}>{accountHolder}</div>
        <div css={accountNumberStyle}>
          {bankName} {accountNumber}
        </div>
      </div>
      <button
        css={copyButtonStyle}
        disabled={copyButtonDisabled}
        onClick={handleClickCopyButton}
      >
        복사
      </button>
    </div>
  );
};

const accountStyle = css`
  background-color: var(--gray1);
  padding: 0.8rem 0rem;
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

const copyButtonStyle = css`
  background-color: var(--blue9);
  color: var(--gray1);
  font-size: 0.75rem;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:not(:disabled):hover {
    background-color: var(--blue11);
  }

  &:disabled {
    background-color: var(--gray5);
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Account;
