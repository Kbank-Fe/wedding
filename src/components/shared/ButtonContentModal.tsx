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
                <IoIosClose size={28} />
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
  padding: 0.8rem 1rem;
  background-color: var(--gray2);
  color: var(--gray11);
  border-radius: 8px;
  border: 1px solid var(--gray4);
  font-size: 12px;
  font-family: 'Wedding';
  font-weight: 700;
  margin: 0 1rem;

  /* 클릭/탭 시 배경 깜빡임 제거 */
  -webkit-tap-highlight-color: transparent;
`;

const modalOverlayStyle = css`
  position: fixed;
  inset: 0;
  background-color: #e8e8e8;
  opacity: 0.95;
  max-width: 430px;
  margin: 0 auto;
`;

const modalContentStyle = css`
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: transparent;
  font-family: 'Wedding';
  font-weight: 700;
  max-width: 430px;
  margin: 0 auto;
`;

const modalHeaderStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 60px;
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

const modalMainStyle = css`
  padding: 0 4rem;
  margin: auto 0;
`;

export default ButtonContentModal;
