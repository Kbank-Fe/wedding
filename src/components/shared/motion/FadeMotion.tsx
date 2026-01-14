import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type motionDirection = 'up' | 'down';

type FadeMotionProps = {
  children: ReactNode;
  className?: string;
  motionDirection?: motionDirection;
};

const directionMap: Record<motionDirection, number> = {
  up: 30,
  down: -30,
};

const FadeMotion = ({
  children,
  className,
  motionDirection = 'up',
}: FadeMotionProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: directionMap[motionDirection] }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
    viewport={{ amount: 0.5, once: true }}
    whileInView={{ opacity: 1, y: 0 }}
  >
    {children}
  </motion.div>
);

export default FadeMotion;
