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

  // split text 애니메이션 variants
  const charVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };
  const titleContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  // names 영역 별도 애니메이션
  const namesVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7 } },
  };

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
        {/* 1. split text 애니메이션 */}
        <motion.p
          animate="visible"
          css={titleStyle}
          initial="hidden"
          variants={titleContainerVariants}
        >
          {weddingIntroData.title.split('').map((char, idx) => (
            <motion.span key={idx} variants={charVariants}>
              {char}
            </motion.span>
          ))}
        </motion.p>

        {/* 2. content는 기존대로 유지 */}
        <motion.div
          dangerouslySetInnerHTML={{ __html: weddingIntroData.content }}
          variants={fadeUp}
        />

        <br />

        {/* 3. names에 별도 애니메이션 적용 */}
        {weddingIntroData.showNames && (
          <motion.p
            animate="visible"
            css={namesStyle(weddingIntroData.alignment)}
            initial="hidden"
            variants={namesVariants}
          >
            {maleNames} <br /> {femaleNames}
          </motion.p>
        )}
      </motion.div>
    </>
  );
};

const introContainerStyle = css`
  padding: 24px;
  border-radius: 12px;
  text-align: center;
`;

const titleStyle = css`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const namesStyle = (alignment: TextAlignment) => css`
  text-align: ${alignment};
  font-size: 13px;
  line-height: 1.5;
`;

export default WeddingIntro;
