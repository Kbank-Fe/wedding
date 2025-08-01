import { motion } from 'framer-motion';

import type { TextAlignment, UserBasicInfo } from '@/types/weddingIntro';

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
}: UserInfoProps) => (
  <motion.p css={namesStyle(alignment)} variants={fadeUp}>
    {maleFatherName} · {maleMotherName}의 아들 {maleName} <br />
    {femaleFatherName} · {femaleMotherName}의 딸 {femaleName}
  </motion.p>
);

const namesStyle = (alignment: TextAlignment) => ({
  textAlign: alignment,
  fontSize: '0.9rem',
  lineHeight: 1.5,
});

export default UserInfo;
