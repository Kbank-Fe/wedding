import { css } from '@emotion/react';
import { Portal } from '@radix-ui/react-portal';
import { AnimatePresence, motion } from 'framer-motion';

import LoadingSpinner from '@/components/shared/LoadingSpinner';

type LoadingBackdropProps = {
  open: boolean;
  onClick?: () => void;
  blur?: boolean;
  zIndex?: number;
  text?: string;
};

const LoadingBackdrop = ({
  open,
  onClick,
  blur = false,
  zIndex = 1300,
  text,
}: LoadingBackdropProps) => {
  return (
    <AnimatePresence>
      {open && (
        <Portal>
          <motion.div
            animate={{ opacity: 1 }}
            css={backdropStyle({ blur, zIndex })}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClick}
          >
            <div css={contentStyle}>
              <LoadingSpinner />
              {text && <p css={textStyle}>{text}</p>}
            </div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

const textStyle = css`
  color: var(--gray3);
`;

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const backdropStyle = ({
  blur,
  zIndex,
}: {
  blur: boolean;
  zIndex: number;
}) => css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  ${blur && `backdrop-filter: blur(4px);`}
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex};
  cursor: pointer;
`;

export default LoadingBackdrop;
