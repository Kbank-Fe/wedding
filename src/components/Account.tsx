import styled from '@emotion/styled';

const Account = () => {
  return (
    <Container>
      <AccountArea>
        <AccountNumber>123-456-789</AccountNumber>
        <CopyButton>복사</CopyButton>
      </AccountArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AccountArea = styled.div`
  background-color: red;
  padding: 1rem 4rem;
  border-radius: 12px;
  display: flex;
`;

const AccountNumber = styled.span`
  background-color: white;
`;

const CopyButton = styled.button`
  background-color: blue;
  padding-left: 10px;
`;

export default Account;
