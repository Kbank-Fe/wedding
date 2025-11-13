import { css, Global } from '@emotion/react';

import { useThemeStore } from '@/stores/useThemeStore';

const resetCSS = css`
  @font-face {
    font-family: 'Wedding';
    src: url('/fonts/Wedding-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Wedding';
    src: url('/fonts/Wedding-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Wedding';
    src: url('/fonts/Wedding-SemiBold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'BasicSans';
    src: url('/fonts/BasicSans-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'BasicSans';
    src: url('/fonts/BasicSans-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'BasicSans';
    src: url('/fonts/BasicSans-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'BasicSans';
    src: url('/fonts/BasicSans-SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }
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
    font-family: 'BasicSans', 'Wedding', sans-serif;
    background: var(--gray2);
    color: var(--gray12);
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
    box-sizing: border-box;
    height: auto;
    display: block;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
    pointer-events: none;
  }
  button {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
  }
  button:focus {
    outline: none;
  }
  button:focus-visible {
    outline: 1px solid var(--gray2);
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
    max-width: 100%;
    box-sizing: border-box;
  }
  textarea {
    resize: none;
  }
  [data-sonner-toast] {
    color: var(--gray12) !important;
    font-family: 'BasicSans', sans-serif;

    [data-title],
    [data-description] {
      color: var(--gray12) !important;
    }
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
