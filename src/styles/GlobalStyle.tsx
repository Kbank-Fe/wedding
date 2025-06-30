import { css, Global } from '@emotion/react';

import { useThemeStore } from '@/hooks/useThemeStore';

const resetCSS = css`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    height: 100%;
    font-family: Arial, sans-serif;
  }
  ul,
  ol {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: normal;
    margin: 0;
  }
  p {
    margin: 0;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  input,
  textarea {
    font: inherit;
    border: none;
    outline: none;
  }
  textarea {
    resize: none;
  }
`;

const GlobalStyle = () => {
  const cssVariables = useThemeStore((state) => state.cssVariables);

  return (
    <Global
      styles={css`
        ${resetCSS}

        :root {
          ${cssVariables}
        }
      `}
    />
  );
};

export default GlobalStyle;
