import { css } from '@emotion/react';

type dtimeInfo = {
  dtimeNumber: number;
  dtimeText: string;
};

const DtimeItem = ({ dtimeNumber, dtimeText }: dtimeInfo) => {
  return (
    <>
      <div css={dtimeBoxStyle}>
        <span css={dtimeValueStyle}>{dtimeNumber}</span>
        <span css={dtimeLabelStyle}>{dtimeText}</span>
      </div>
    </>
  );
};

const dtimeBoxStyle = css`
  background: var(--gray1);
  border-radius: 12px;
  min-width: 56px;
  min-height: 64px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 3px 3px 12px 0 var(--gray8);
  position: relative;
`;

const dtimeValueStyle = css`
  font-size: 1.2rem;
  color: var(--gray12);
`;

const dtimeLabelStyle = css`
  font-size: 0.8rem;
  color: var(--gray9);
  margin-top: 2px;
`;

export default DtimeItem;
