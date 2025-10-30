import { css } from '@emotion/react';

const LoadingSpinner = () => {
  return (
    <div css={containerStyle}>
      <div css={spinnerStyle} />
    </div>
  );
};

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
`;

const spinnerStyle = css`
  height: 2.4rem;
  width: 2.4rem;
  border-radius: 50%;
  border: 6px solid var(--gray3);
  border-top-color: var(--gray5);
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
