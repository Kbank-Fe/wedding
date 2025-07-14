import type { SerializedStyles } from '@emotion/react';
import { type HTMLMotionProps, motion } from 'framer-motion';

import { listVariants } from '@/animations/accountListVariants';

type MotionListProps = {
  css?: SerializedStyles;
  children: React.ReactNode;
} & HTMLMotionProps<'div'>;

const MotionList = ({ css: cssProp, children, ...rest }: MotionListProps) => (
  <motion.div
    animate="visible"
    css={cssProp}
    initial="hidden"
    variants={listVariants}
    {...rest}
  >
    {children}
  </motion.div>
);

export default MotionList;
