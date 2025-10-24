import { css } from '@emotion/react';
import { Phone } from 'lucide-react';

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
          <Phone size={20} />
        </a>
      </div>
    </>
  );
};

const contactRowStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin: 12px 12px;
`;

const partStyle = css`
  min-width: 110px;
  font-size: 12px;
  color: var(--gray11);
`;

const iconStyle = css`
  color: var(--gray9);
`;

export default ContactItem;
