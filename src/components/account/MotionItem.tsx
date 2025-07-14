import { motion } from 'framer-motion';

import { itemVariants } from '@/animations/accountListVariants';

type MotionItemProps = {
  children: React.ReactNode;
};

const MotionItem = ({ children }: MotionItemProps) => (
  <motion.div variants={itemVariants}>{children}</motion.div>
);

export default MotionItem;
