import styled from '@emotion/styled';

const Account = () => {
  return (
    <AccountArea>
      <AccountNumber>123-456-789</AccountNumber>
      <CopyButton>복사</CopyButton>
    </AccountArea>
  );
};

const AccountArea = styled.div`
  background-color: red;
  width: 80%;
  padding: 1rem 2rem;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccountNumber = styled.div`
  background-color: #ddffb6;
`;

const CopyButton = styled.button`
  background-color: blue;
`;

export default Account;
