import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type motionDirection = 'up' | 'down';

type MotionFadeProps = {
  children: ReactNode;
  className?: string;
  motionDirection?: motionDirection;
};

const directionMap: Record<motionDirection, number> = {
  // motion 방향 Y축 (음수: 위->아래, 양수: 아래->위)
  up: 30,
  down: -30,
};

export const MotionFade = ({
  children,
  className,
  motionDirection = 'up',
}: MotionFadeProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: directionMap[motionDirection] }} // motion 시작 위치 설정 (방향 설정)
    transition={{ duration: 1.5, ease: 'easeOut' }} // 천천히
    viewport={{ amount: 0.5 }} // 50% 보이면 실행, 1회만
    whileInView={{ opacity: 1, y: 0 }}
  >
    {children}
  </motion.div>
);
