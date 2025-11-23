import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';

import TypingText from '@/components/shared/motion/TypingTextMotion';

type TypingOverlayProps = {
  show: boolean;
  title: string;
  subtitle?: string;
  onExit?: () => void;
};

const TypingOverlay = ({
  show,
  title,
  subtitle,
  onExit,
}: TypingOverlayProps) => {
  return (
    <AnimatePresence mode="wait" onExitComplete={onExit}>
      {show && (
        <motion.div
          key="typing"
          animate={{ opacity: 1 }}
          css={typingOverlayStyle}
          exit={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 2 }}
        >
          <div css={textContainerStyle}>
            <TypingText delay={0.6} text={title} />
            {subtitle && <p css={fadeSubTextStyle}>{subtitle}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const typingOverlayStyle = css`
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--gray12);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  width: 100%;
  max-width: 430px;
  margin: 0 auto;
`;

const textContainerStyle = css`
  text-align: center;
  color: var(--gray2);
`;

const fadeSubTextStyle = css`
  font-family: 'Kristi', cursive;
  font-size: 27px;
  color: var(--gray6);
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
  animation-delay: 2.5s;

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
`;

export default TypingOverlay;
