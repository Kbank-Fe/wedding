import { motion } from 'framer-motion';

import { fadeUp } from '@/styles/Animation';
import type { TextAlignment, UserBasicInfo } from '@/types/Intro';

type UserInfoProps = UserBasicInfo & { alignment: TextAlignment };

const UserInfo = ({ maleNames, femaleNames, alignment }: UserInfoProps) => (
  <motion.p css={namesStyle(alignment)} variants={fadeUp}>
    {maleNames} <br /> {femaleNames}
  </motion.p>
);

const namesStyle = (alignment: TextAlignment) => ({
  textAlign: alignment,
  fontSize: '0.9rem',
  lineHeight: 1.5,
});

export default UserInfo;
