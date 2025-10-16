import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import UserInfo from '@/components/Intro/UserInfo';
import Header from '@/components/shared/Header';
import { useWeddingStore } from '@/stores/useWeddingStore';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const WeddingIntro = () => {
  const intro = useWeddingStore((state) => state.values.intro);

  return (
    <>
      <Header title={'Wedding Day~'} />
      <motion.div
        css={introContainerStyle}
        initial="hidden"
        variants={fadeUp}
        viewport={{ amount: 0.5, once: true }}
        whileInView="visible"
      >
        <motion.p css={titleStyle} variants={fadeUp}>
          {intro.title}
        </motion.p>
        <motion.div
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
