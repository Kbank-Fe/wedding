import styled from '@emotion/styled';

type accountType = {
  bankName: string;
  accountNumber: string;
};

type AccountProps = {
  accountInfo: accountType;
};

const Account = ({ accountInfo }: AccountProps) => {
  const handlerClickCopyButton = () => {
    copyToClipboard(accountInfo.bankName + ' ' + accountInfo.accountNumber);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 복사되었습니다!');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return (
    <AccountContainer>
      <AccountArea>
        <BankName>{accountInfo.bankName}</BankName>
        <AccountNumber>{accountInfo.accountNumber}</AccountNumber>
      </AccountArea>
      <CopyButton onClick={handlerClickCopyButton}>복사</CopyButton>
    </AccountContainer>
  );
};

const AccountContainer = styled.div`
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

const AccountArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const BankName = styled.div`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 4px;
`;

const AccountNumber = styled.div`
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
`;

const CopyButton = styled.button`
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
