import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = '404 Not Found | Wedding';
  }, []);

  return (
    <main css={containerStyle}>
      <section css={sectionStyle}>
        <div aria-hidden css={codeStyle}>
          404
        </div>
        <h1 css={titleStyle}>페이지를 찾을 수 없어요</h1>
        <p css={descriptionStyle}>
          요청하신 주소가 변경되었거나 삭제되었을 수 있어요. 아래 버튼으로
          이동해 보세요.
        </p>
        <div css={buttonWrapperStyle}>
          <button css={[buttonStyle, primary]} onClick={() => navigate('/')}>
            홈으로 가기
          </button>
          <button css={[buttonStyle, ghost]} onClick={() => navigate(-1)}>
            이전 페이지
          </button>
        </div>
      </section>
    </main>
  );
};

const containerStyle = css`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: var(--gray1);
  color: var(--gray12);
`;

const sectionStyle = css`
  width: min(500px, 100%);
  background: var(--gray1);
  border: 1px solid var(--gray2);
  border-radius: 1rem;
  padding: 2.2rem;
  text-align: center;
`;

const codeStyle = css`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
  margin-bottom: 0.5rem;
  color: var(--gray10);
`;

const titleStyle = css`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.25rem 0 1rem;
  color: var(--gray11);
`;

const descriptionStyle = css`
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
  color: var(--gray9);
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const buttonWrapperStyle = css`
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
  justify-content: center;
`;

const buttonStyle = css`
  border-radius: 2rem;
  padding: 0.8rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 0.08s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:active {
    transform: translateY(1px);
  }
`;

const primary = css`
  background: var(--blue9);
  color: var(--gray1);
  box-shadow: 0 6px 16px var(--gray6);

  &:hover {
    background: var(--blue11);
  }
`;

const ghost = css`
  background: transparent;
  color: inherit;
  border: 1px solid var(--gray4);

  &:hover {
    background: var(--gray3);
  }
`;

export default NotFoundPage;
