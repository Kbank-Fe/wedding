import { css } from '@emotion/react';

import Account from '@/components/Account';

const accounts = [
  { bankName: '기업은행', accountNumber: '640-022316-01-011' },
  { bankName: '국민은행', accountNumber: '123-456-789012' },
  { bankName: '신한은행', accountNumber: '987-654-321098' },
];

const AccountList = () => {
  return (
    <div css={accountListStyle}>
      {accounts.map((account, index) => (
        <Account key={index} {...account} />
      ))}
    </div>
  );
};

const accountListStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  gap: 20px;
  height: 100vh;
`;

export default AccountList;
