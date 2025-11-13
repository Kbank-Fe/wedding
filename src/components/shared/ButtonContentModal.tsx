import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoIosClose } from 'react-icons/io';

type ButtonContentModalProps = {
  children: React.ReactNode;
  buttonText: string;
  title: string;
  description?: string;
  onClose?: () => void;
};

const ButtonContentModal = ({
  children,
  buttonText,
  title,
  description,
  onClose,
}: ButtonContentModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button css={modalButtonStyle}>{buttonText}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay css={modalOverlayStyle} />
        <Dialog.Content css={modalContentStyle}>
          <header css={modalHeaderStyle}>
            <Dialog.Title css={modalTitleStyle}>{title}</Dialog.Title>
            <Dialog.Description css={modalDescriptionStyle}>
              {description}
            </Dialog.Description>
            <Dialog.Close asChild>
              <button css={modalCloseStyle} onClick={onClose}>
                <IoIosClose size={28} />
              </button>
            </Dialog.Close>
          </header>
          <div css={scrollAreaStyle}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const modalButtonStyle = css`
  padding: 0.8rem 1rem;
  background-color: var(--gray2);
  color: var(--gray11);
  border-radius: 8px;
  border: 1px solid var(--gray4);
  font-size: 12px;
  font-family: 'Wedding';
  font-weight: 700;
  margin: 0 1rem;
  -webkit-tap-highlight-color: transparent;
`;

const modalOverlayStyle = css`
  position: fixed;
  inset: 0;
  background-color: var(--gray4);
  opacity: 0.9;
  margin: 0 auto;
  z-index: 999;
`;

const modalContentStyle = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  width: min(100%, 430px);
  height: 100dvh; /* Android chrome safe area 대응 */
  background: #fff;
  font-family: 'Wedding';
  overflow: hidden;
  z-index: 1000;

  /* IOS safari safe area 대응 */
  @supports (padding-top: env(safe-area-inset-top)) {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }

  @supports (padding-top: constant(safe-area-inset-top)) {
    padding-top: constant(safe-area-inset-top);
    padding-bottom: constant(safe-area-inset-bottom);
  }
`;

const modalHeaderStyle = css`
  flex-shrink: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--gray4);
  position: relative;
`;

const modalTitleStyle = css`
  font-size: 14px;
  color: var(--gray12);
  font-weight: 700;
`;

const modalDescriptionStyle = css`
  display: none;
`;

const modalCloseStyle = css`
  position: absolute;
  right: 1rem;
  color: var(--gray12);
`;

const scrollAreaStyle = css`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export default ButtonContentModal;
