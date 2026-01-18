import { css } from '@emotion/react';
import { Portal } from '@radix-ui/react-portal';
import { AnimatePresence, motion } from 'framer-motion';

type LoadingBackdropProps = {
  open: boolean;
  blur?: boolean;
  zIndex?: number;
  text?: string;
};

const LoadingBackdrop = ({
  open,
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
          >
            <div css={contentStyle}>
              <motion.img
                alt="Us Day Logo"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                css={imageStyle}
                src="/images/logo_smile.png"
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {text && <p css={textStyle}>{text}</p>}
            </div>
          </motion.div>
        </Portal>
      )}
    </AnimatePresence>
  );
};

const textStyle = css`
  color: var(--gray10);
  font-family: 'Wedding', cursive;
  font-size: 15px;
  margin-top: 0.8rem;
`;

const imageStyle = css`
  width: 90px;
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
  background-color: rgba(255, 255, 255, 0.8);
  ${blur && `backdrop-filter: blur(4px);`}
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex};
  cursor: pointer;
`;

export default LoadingBackdrop;
