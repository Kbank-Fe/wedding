import { css } from '@emotion/react';
import { Mail, Phone } from 'lucide-react';

type ContactItemProps = {
  part: string;
  name: string;
  phone: string;
  email: string;
};

const ContactItem = ({ part, name, phone, email }: ContactItemProps) => {
  return (
    <>
      <div css={contactRowStyle}>
        <span css={partStyle}>{part}</span>
        <span css={nameStyle}>{name}</span>
        <span css={iconGroupStyle}>
          <a href={'tel:' + phone}>
            <Phone size={20} />
          </a>
          <a href={'mailto:' + email}>
            <Mail size={18} />
          </a>
        </span>
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
  min-width: 100px;
  text-align: left;
`;

const nameStyle = css`
  flex: 1;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const iconGroupStyle = css`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export default ContactItem;
