import { css } from '@emotion/react';

import ContactItem from '@/components/contact/ContactItem';
import Header from '@/components/shared/Header';
import Line from '@/components/shared/Line';
import { MotionFade } from '@/components/shared/MotionFade';
import { useWeddingStore } from '@/stores/useWeddingStore';

const Contact = () => {
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
      <Header title="Contact" />

      <MotionFade css={contactMotionStyle}>
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
      </MotionFade>

      <hr css={gapHrStyle} />

      <MotionFade css={contactMotionStyle}>
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
      </MotionFade>
    </>
  );
};

const contactMotionStyle = css`
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
  color: var(--gray11);
`;

const titleStyle = css`
  font-weight: 600;
  margin: 0 16px;
  font-size: 0.9rem;
`;

export default Contact;
