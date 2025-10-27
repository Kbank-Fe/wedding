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
        {groomFilteredList.length === 0 ? (
          <span css={textStyle}>신랑 측 등록된 연락처가 없어요</span>
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

      <Line marginBottom={45} marginTop={45} />

      <div css={wrapperStyle}>
        {bridgeFilteredList.length === 0 ? (
          <span css={textStyle}>신부 측 등록된 연락처가 없어요</span>
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
  gap: 2rem;
`;

const textStyle = css`
  font-size: 13px;
  color: var(--gray11);
`;

export default ContactModal;
