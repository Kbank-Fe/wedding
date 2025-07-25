import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import Header from '@/components/Header';
import type { Intro } from '@/types/Intro';
import type { TextAlignment } from '@/types/TextAlignment';

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
    showNames: true,
    alignment: 'center' as const,
    maleName: 'MMM',
    femaleName: 'FFF',
    maleFatherName: '신랑아버지',
    maleMotherName: '신랑어머니',
    femaleFatherName: '신부아버지',
    femaleMotherName: '신부어머니',
  };

  const maleNames = `${weddingIntroData.maleFatherName} · ${weddingIntroData.maleMotherName}의 아들 ${weddingIntroData.maleName}`;
  const femaleNames = `${weddingIntroData.femaleFatherName} · ${weddingIntroData.femaleMotherName}의 딸 ${weddingIntroData.femaleName}`;

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
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

        {weddingIntroData.showNames && (
          <motion.p
            css={namesStyle(weddingIntroData.alignment)}
            variants={fadeUp}
          >
            {maleNames} <br /> {femaleNames}
          </motion.p>
        )}
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

const namesStyle = (alignment: TextAlignment) => css`
  text-align: ${alignment};
  font-size: 0.8125rem;
  line-height: 1.5;
`;

export default WeddingIntro;
