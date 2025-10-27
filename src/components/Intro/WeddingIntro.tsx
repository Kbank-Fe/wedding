import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import UserInfo from '@/components/Intro/UserInfo';
import { useWeddingStore } from '@/stores/useWeddingStore';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const WeddingIntro = () => {
  const intro = useWeddingStore((state) => state.values.intro);

  return (
    <>
      <motion.div
        css={introContainerStyle}
        initial="hidden"
        variants={fadeUp}
        viewport={{ amount: 0.5 }}
        whileInView="visible"
      >
        <motion.p css={titleStyle} variants={fadeUp}>
          {intro.title}
        </motion.p>
        <motion.div
          css={contentStyle}
          dangerouslySetInnerHTML={{ __html: intro.content }}
          variants={fadeUp}
        />
        <br />
        {intro.showNames && (
          <UserInfo
            alignment={intro.alignment}
            femaleFatherDeceased={intro.basicInfo.femaleFatherDeceased}
            femaleFatherName={intro.basicInfo.femaleFatherName}
            femaleMotherDeceased={intro.basicInfo.femaleMotherDeceased}
            femaleMotherName={intro.basicInfo.femaleMotherName}
            femaleName={intro.basicInfo.femaleName}
            maleFatherDeceased={intro.basicInfo.maleFatherDeceased}
            maleFatherName={intro.basicInfo.maleFatherName}
            maleMotherDeceased={intro.basicInfo.maleMotherDeceased}
            maleMotherName={intro.basicInfo.maleMotherName}
            maleName={intro.basicInfo.maleName}
          />
        )}
      </motion.div>
    </>
  );
};

const introContainerStyle = css`
  padding: 0 1rem;
  text-align: center;
`;

const titleStyle = css`
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 2.3rem;
`;

const contentStyle = css`
  font-size: 14px;
  color: var(--gray11);
  line-height: 1.6rem;
`

export default WeddingIntro;
