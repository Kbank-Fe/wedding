import { css } from '@emotion/react';
import { motion } from 'framer-motion';

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
}: UserInfoProps) => (
  <motion.p css={namesStyle(alignment)} variants={fadeUp}>
    {maleFatherDeceased && '(故)'}
    {maleFatherName} · {maleMotherDeceased && '(故)'}
    {maleMotherName}의 아들 {maleName} <br />
    {femaleFatherDeceased && '(故)'}
    {femaleFatherName} · {femaleMotherDeceased && '(故)'}
    {femaleMotherName}의 딸 {femaleName}
  </motion.p>
);

const namesStyle = (alignment: TextAlignment) => css`
  text-align: ${alignment};
  font-size: 0.9rem;
  line-height: 1.5;
`;

export default UserInfo;
