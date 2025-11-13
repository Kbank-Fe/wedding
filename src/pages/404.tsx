import { css } from '@emotion/react';
import { type MouseEventHandler, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '@/components/shared/Layout';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Not Found | 내가 만드는 우리의 날, 어스데이';
  }, []);

  const handleClickHomeButton: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/');
  };

  return (
    <Layout viewType="service">
      <div css={containerStyle}>
        <div css={LogoWrapperStyle}>
          <img alt="Us Day Logo" css={imageStyle} src="/images/logo_sad.png" />
          <h2 css={textStyle}>404; Not Found</h2>
          <p css={descriptionStyle}>
            잘못된 경로로 접근하셨습니다. <br />
            아래 버튼을 눌러 서비스를 다시 이용해 주세요.
          </p>
        </div>
        <button css={buttonStyle} onClick={handleClickHomeButton}>
          어스데이 메인으로 가기
        </button>
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
  gap: 0.4rem;
  margin-bottom: 3rem;
`;

const buttonStyle = css`
  width: 250px;
  padding: 0.8rem 1rem;
  background-color: var(--gray2);
  color: var(--gray11);
  border-radius: 8px;
  border: 1px solid var(--gray4);
  font-size: 12px;
  font-family: 'Wedding';
  font-weight: 700;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &:hover {
    background-color: var(--gray8);
    color: var(--gray1);
    border-color: var(--gray8);
  }

  &:active {
    background-color: var(--gray11);
    color: var(--gray1);
    border-color: var(--gray11);
  }
`;

const imageStyle = css`
  width: 6.8rem;
`;

const textStyle = css`
  font-size: 21px;
  font-weight: 400;
  color: var(--gray11);
  letter-spacing: -1px;
  text-transform: uppercase;
`;

const descriptionStyle = css`
  font-size: 13px;
  margin-top: 0.8rem;
  color: var(--gray9);
  text-align: center;
  line-height: 1.4rem;
`;

export default NotFoundPage;
