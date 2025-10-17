import { css } from '@emotion/react';
import * as Dialog from '@radix-ui/react-dialog';

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
      {/* 모달 열기 버튼 */}
      <Dialog.Trigger asChild>
        <button css={modalButtonStyle}>{buttonText}</button>
      </Dialog.Trigger>

      <Dialog.Portal>
        {/* 검정 반투명 배경 */}
        <Dialog.Overlay css={modalOverlayStyle} />

        {/* 전체 컨텐츠 */}
        <Dialog.Content css={modalContentStyle}>
          {/* 상단 헤더 */}
          <header css={modalHeaderStyle}>
            <Dialog.Title css={modalTitleStyle}>{title}</Dialog.Title>

            <Dialog.Description css={modalDescriptionStyle}>
              {description}
            </Dialog.Description>

            {/* 닫기 버튼 (우측 상단) */}
            <Dialog.Close asChild>
              <button css={modalCloseStyle} onClick={onClose}>
                ✕
              </button>
            </Dialog.Close>
          </header>

          {/* 본문 */}
          <main css={modalMainStyle}>{children}</main>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const modalButtonStyle = css`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: var(--gray4);
  color: var(--gray12);
  border-radius: 1rem;
  font-size: 1rem;
`;

const modalOverlayStyle = css`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
`;

const modalContentStyle = css`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  color: white;
  background: transparent;
`;

const modalHeaderStyle = css`
  position: relative;
  padding: 1.5rem;
  text-align: center;
`;

const modalTitleStyle = css`
  font-size: 1rem;
  font-weight: bold;
`;

const modalDescriptionStyle = css`
  display: none;
`;

const modalCloseStyle = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: var(--gray1);
  cursor: pointer;
`;

const modalMainStyle = css`
  flex: 1;
  padding: 2rem;
`;

export default ButtonContentModal;
