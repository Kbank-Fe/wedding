import { css } from '@emotion/react';

import ContactItem from '@/components/contact/ContactItem';
import Header from '@/components/shared/Header';

import { MotionFade } from '../shared/MotionFade';

const Contact = () => {
  return (
    <>
      <Header title="Contact" />

      <MotionFade css={contactMotionStyle}>
        <span css={titleStyle}>신랑측</span>
        <hr css={lineStyle} />
        <ContactItem name="박진형" part="신랑" phone="01012345678" />
        <ContactItem name="박박박" part="신랑 아버지" phone="01012345678" />
        <ContactItem name="진진진" part="신랑 어머니" phone="01012345678" />
      </MotionFade>

      <hr css={gapHrStyle} />

      <MotionFade css={contactMotionStyle}>
        <span css={titleStyle}>신부측</span>
        <hr css={lineStyle} />
        <ContactItem name="형진박" part="신부" phone="01012345678" />
        <ContactItem
          name="진형박진형입니다안녕하세요반갑습니다정말"
          part="신부 아버지"
          phone="01012345678"
        />
        <ContactItem name="형형형형형" part="신부 어머니" phone="01012345678" />
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

const titleStyle = css`
  font-weight: 600;
  margin: 0 16px;
  font-size: 0.9rem;
`;

const lineStyle = css`
  border: none;
  border-bottom: 1.5px solid var(--gray11);
  margin: 12px 0 8px 0;
`;

export default Contact;
