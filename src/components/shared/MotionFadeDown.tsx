import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type MotionFadeDownProps = {
  children: ReactNode;
  className?: string;
};

export const MotionFadeDown = ({
  children,
  className,
}: MotionFadeDownProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: -60 }} // 더 위에서 시작
    transition={{ duration: 1.5, ease: 'easeOut' }} // 천천히
    viewport={{ once: true, amount: 0.5 }} // 50% 보이면 실행, 1회만
    whileInView={{ opacity: 1, y: 0 }}
  >
    {children}
  </motion.div>
);
