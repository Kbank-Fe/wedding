import { css } from '@emotion/react';
import type { ReactNode } from 'react';

type TransferProps = {
  title?: string;
  description?: ReactNode;
};

const TransferItem = ({ title, description }: TransferProps) => {
  return (
    <div css={wrapperStyle}>
      {title && <h2 css={titleStyle}>{title}</h2>}
      {description && <div css={descriptionStyle}>{description}</div>}
    </div>
  );
};

const wrapperStyle = css`
  border: 1px solid var(--gray5);
  border-radius: 0.7rem;
  padding: 1.3rem 1.5rem;
  background-color: var(--gray2);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 3px 7px rgba(48, 48, 48, 0.08);
  }
`;

const titleStyle = css`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const descriptionStyle = css`
  color: var(--gray11);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.3rem;

  strong {
    font-weight: 600;
  }

  em {
    color: var(--gray10);
    font-style: normal;
    font-weight: 600;
  }
`;

export default TransferItem;
