import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import UserInfo from '@/components/Intro/UserInfo';
import Header from '@/components/shared/Header';
import type { Intro } from '@/types/weddingIntro';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const WeddingIntro = () => {
  const weddingIntroData: Intro = {
    title: '저희 결혼합니다',
    content: `
      <div id="intro-ment-area">
        <p>100년 동안 당신을 모르고 사는 것보다,</p>
        <p>당신을 알고 지금 죽는 게 더 나아요.</p>
        <p>&nbsp;</p>
        <p>- 디즈니, &lt;포카혼타스&gt; 中 -</p>
        <p>-</p>
        <p>평생 서로 귀하게 여기며<br>첫 마음 그대로 존중하고&nbsp;</p>
        <p>배려하며 살겠습니다.<br><br>오로지 믿음과 사랑을 약속하는 날<br>오셔서 축복해 주시면 더 없는 기쁨으로<br>간직하겠습니다.</p>
      </div>
    `,
    alignment: 'center',
    showNames: true,
    basicInfo: [
      {
        maleName: 'MMM',
        femaleName: 'FFF',
        maleFatherName: '신랑아버지',
        maleMotherName: '신랑어머니',
        femaleFatherName: '신부아버지',
        femaleMotherName: '신부어머니',
      },
    ],
  };

  return (
    <>
      <Header title={'Wedding Day~!'} />
      <motion.div
        css={introContainerStyle}
        initial="hidden"
        variants={fadeUp}
        viewport={{ amount: 0.5, once: true }}
        whileInView="visible"
      >
        <motion.p css={titleStyle} variants={fadeUp}>
          {weddingIntroData.title}
        </motion.p>

        <motion.div
          dangerouslySetInnerHTML={{ __html: weddingIntroData.content }}
          variants={fadeUp}
        />

        <br />

        {weddingIntroData.showNames &&
          weddingIntroData.basicInfo.map((info, idx) => (
            <UserInfo
              key={idx}
              alignment={weddingIntroData.alignment}
              femaleFatherName={info.femaleFatherName}
              femaleMotherName={info.femaleMotherName}
              femaleName={info.femaleName}
              maleFatherName={info.maleFatherName}
              maleMotherName={info.maleMotherName}
              maleName={info.maleName}
            />
          ))}
      </motion.div>
    </>
  );
};

const introContainerStyle = css`
  padding: 1.5rem;
  border-radius: 0.75rem;
  text-align: center;
`;

const titleStyle = css`
  font-size: 1.375rem;
  font-weight: bold;
  margin-bottom: 0.625rem;
`;

export default WeddingIntro;
