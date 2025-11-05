import { css } from '@emotion/react';

import KakaoLoginButton from '@/components/login/KakaoLoginButton';
import Layout from '@/components/shared/Layout';

const HomePage = () => {
  return (
    <Layout viewType="service">
      <div css={containerStyle}>
        <div css={LogoWrapperStyle}>
          <img alt="Us Day Logo" css={imageStyle} src="/images/logo.png" />
          <p css={textStyle}>내가 만드는 우리의 날, 어스데이</p>
        </div>
        <KakaoLoginButton />
      </div>
    </Layout>
  );
};

const containerStyle = css`
  width: 100%;
  height: 100vh;
  padding: 0 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoWrapperStyle = css`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const imageStyle = css`
  width: 8.5rem;
`;

const textStyle = css`
  font-size: 0.87rem;
  font-weight: 400;
  color: var(--gray9);
  letter-spacing: -1px;
`;

export default HomePage;
