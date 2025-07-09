import { css } from '@emotion/react';

type AccountType = {
  bankName: string;
  accountNumber: string;
};

const Account = ({ bankName, accountNumber }: AccountType) => {
  const handlerClickCopyButton = () => {
    copyToClipboard(bankName + ' ' + accountNumber);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('복사 성공');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <div css={accountStyle}>
      <div css={accountInfoStyle}>
        <div css={bankNameStyle}>{bankName}</div>
        <div css={accountNumberStyle}>{accountNumber}</div>
      </div>
      <button css={copyButtonStyle} onClick={handlerClickCopyButton}>
        복사
      </button>
    </div>
  );
};

const accountStyle = css`
  background-color: #ffffff;
  width: 80%;
  max-width: 320px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const accountInfoStyle = css`
  display: flex;
  flex-direction: column;
`;

const bankNameStyle = css`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const accountNumberStyle = css`
  font-size: 0.95rem;
`;

const copyButtonStyle = css`
  background-color: #277dda;
  color: white;
  font-size: 0.9rem;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: #1c5ca0;
  }
`;

export default Account;
