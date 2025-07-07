import styled from '@emotion/styled';

import Account from './Account';

const AccountList = () => {
  return (
    <Container>
      <Account />
      <Account />
      <Account />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  gap: 20px;
  height: 100vh;
`;

export default AccountList;
