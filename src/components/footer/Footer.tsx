import { css } from '@emotion/react';

const Footer = () => {
  return (
    <div css={containerStyle}>
      <div css={buttonContainerStyle}>
        <button css={buttonStyle}>카카오톡 공유</button>
        <button css={buttonStyle}>링크 공유</button>
      </div>
      <img alt="Us Day Logo" css={imageStyle} src="/images/logo.png" />

      <p css={fontStyle}>© usday. All rights reserved.</p>
    </div>
  );
};

const containerStyle = css`
  background-color: var(--gray2);
  width: 100%;
  height: 25vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const buttonStyle = css`
  border: 1px solid var(--gray4);
  padding: 0.5rem 3rem;
  border-radius: 0.5rem;
  color: var(--gray11);
`;

const imageStyle = css`
  width: 3rem;
`;

const fontStyle = css`
  font-size: 0.8rem;
  color: var(--gray9);
`;

export default Footer;
