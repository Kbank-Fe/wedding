import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { TbFlowerFilled } from "react-icons/tb";

import type { TextAlignment, UserBasicInfo } from '@/types/wedding';

type UserInfoProps = UserBasicInfo & { alignment: TextAlignment };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const UserInfo = ({
  maleName,
  maleFatherName,
  maleMotherName,
  femaleName,
  femaleFatherName,
  femaleMotherName,
  alignment,
  maleFatherDeceased,
  maleMotherDeceased,
  femaleFatherDeceased,
  femaleMotherDeceased,
}: UserInfoProps) => {
  return (
    <motion.div css={containerStyle(alignment)} variants={fadeUp}>
      <div css={lineStyle}>
        <span css={parentsStyle}>
          {maleFatherDeceased && <TbFlowerFilled css={iconStyle} />}
          {maleFatherName}
          <span css={dotStyle}> · </span>
          {maleMotherDeceased && <TbFlowerFilled css={iconStyle} />}
          {maleMotherName}
        </span>
        <span css={relationStyle}>의 아들</span>
        <span css={childNameStyle}>{maleName}</span>
      </div>
      <div css={lineStyle}>
        <span css={parentsStyle}>
          {femaleFatherDeceased && <TbFlowerFilled css={iconStyle} />}
          {femaleFatherName}
          <span css={dotStyle}> · </span>
          {femaleMotherDeceased && <TbFlowerFilled css={iconStyle} />}
          {femaleMotherName}
        </span>
        <span css={relationStyle}>의 딸</span>
        <span css={childNameStyle}>{femaleName}</span>
      </div>
    </motion.div>
  );
};

const containerStyle = (alignment: TextAlignment) => css`
  text-align: ${alignment};
  font-size: 14px;
  color: var(--gray11);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 3.5rem;
  padding: 0 1rem;
`;

const lineStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const parentsStyle = css`
  font-weight: 400;
`;

const relationStyle = css`
  font-weight: 400;
  color: var(--gray9);
  width: 50px;
  text-align: left;
`;

const childNameStyle = css`
  font-weight: 700;
  text-align: right;
  flex-shrink: 0;
`;

const iconStyle = css`
  vertical-align: middle;
  margin-right: 4px;
  color: var(--gray9);
`;

const dotStyle = css`
  color: var(--gray8);
  font-weight: 700;
  margin: 0 3px;
`;

export default UserInfo;
