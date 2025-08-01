import { motion } from 'framer-motion';

import type { TextAlignment, UserBasicInfo } from '@/types/Intro';

type UserInfoProps = UserBasicInfo & { alignment: TextAlignment };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

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
