import { css } from '@emotion/react';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return <h1 css={headerStyle}>{title}</h1>;
};

const headerStyle = css`
  text-align: center;
  font-family: 'Dynalight', cursive;
  font-size: 40px;
  margin-bottom: 2rem;
`;

export default Header;
