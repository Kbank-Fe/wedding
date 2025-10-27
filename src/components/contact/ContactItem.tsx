import { css } from '@emotion/react';
import { PiPhoneFill } from 'react-icons/pi';

type ContactItemProps = {
  part: string;
  phone: string;
};

const ContactItem = ({ part, phone }: ContactItemProps) => {
  return (
    <>
      <div css={contactRowStyle}>
        <span css={partStyle}>{part}</span>
        <a css={iconStyle} href={'tel:' + phone}>
          <PiPhoneFill size={20} />
        </a>
      </div>
    </>
  );
};

const contactRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const partStyle = css`
  font-size: 14px;
  color: var(--gray11);
`;

const iconStyle = css`
  color: var(--gray9);
`;

export default ContactItem;
