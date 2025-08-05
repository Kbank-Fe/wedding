import { css } from '@emotion/react';
import { Phone } from 'lucide-react';

type ContactItemProps = {
  part: string;
  name: string;
  phone: string;
};

const ContactItem = ({ part, name, phone }: ContactItemProps) => {
  return (
    <>
      <div css={contactRowStyle}>
        <span css={partStyle}>{part}</span>
        <span css={nameStyle}>{name}</span>
        <a href={'tel:' + phone}>
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
  font-size: 0.9rem;
`;

const nameStyle = css`
  flex: 1;
  /* text-align: left; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.1rem;
`;

export default ContactItem;
