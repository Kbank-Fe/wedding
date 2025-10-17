import { css } from '@emotion/react';

import ContactItem from '@/components/contact/ContactItem';
import Line from '@/components/shared/Line';
import { useWeddingStore } from '@/stores/useWeddingStore';

const ContactModal = () => {
  const contactList =
    useWeddingStore((state) => state.values.contact.contactList) || [];

  const groomFilteredList = contactList.filter(
    (contact) => contact.type === 'Groom' && contact.phone !== '',
  );

  const bridgeFilteredList = contactList.filter(
    (contact) => contact.type === 'Bride' && contact.phone !== '',
  );

  return (
    <>
      <div css={wrapperStyle}>
        <span css={titleStyle}>신랑측</span>
        <Line />
        {groomFilteredList.length === 0 ? (
          <span css={textStyle}>등록된 연락처가 없습니다.</span>
        ) : (
          groomFilteredList.map((contact, index) => (
            <ContactItem
              key={index}
              part={contact.part}
              phone={contact.phone}
            />
          ))
        )}
      </div>

      <hr css={gapHrStyle} />

      <div css={wrapperStyle}>
        <span css={titleStyle}>신부측</span>
        <Line />
        {bridgeFilteredList.length === 0 ? (
          <span css={textStyle}>등록된 연락처가 없습니다.</span>
        ) : (
          bridgeFilteredList.map((contact, index) => (
            <ContactItem
              key={index}
              part={contact.part}
              phone={contact.phone}
            />
          ))
        )}
      </div>
    </>
  );
};

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
`;

const gapHrStyle = css`
  border: none;
  height: 40px;
  background: transparent;
  margin: 0;
  width: 100%;
`;

const textStyle = css`
  margin: 0 16px;
  font-size: 0.9rem;
`;

const titleStyle = css`
  font-weight: 600;
  margin: 0 16px;
  font-size: 0.9rem;
`;

export default ContactModal;
