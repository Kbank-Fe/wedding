import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoIosClose } from 'react-icons/io';

import Layout from '@/components/shared/Layout';

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
          <div css={scrollAreaStyle}>
            <Layout viewType="main">{children}</Layout>
          </div>
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
  background-color: #e8e8e8;
  opacity: 0.95;
  max-width: 430px;
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
  height: 100vh;
  background: #fff;
  overflow: hidden;
  z-index: 1000;
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
  font-size: 15px;
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
