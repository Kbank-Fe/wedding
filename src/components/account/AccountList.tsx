import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';

import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import Account from '@/components/account/Account';
import Header from '@/components/shared/Header';

const groomSideAccounts = [
  {
    bankName: '카카오뱅크',
    accountNumber: '123-456-789',
    accountHolder: '김카뱅',
  },
  {
    bankName: '케이뱅크',
    accountNumber: '123-456-789',
    accountHolder: '김케뱅',
  },
  {
    bankName: '토스뱅크',
    accountNumber: '123-456-789',
    accountHolder: '이토스',
  },
];

const brideSideAccounts = [
  {
    bankName: '국민은행',
    accountNumber: '789-654-321',
    accountHolder: '김국민',
  },
  {
    bankName: '기업은행',
    accountNumber: '789-654-321',
    accountHolder: '김기업',
  },
  {
    bankName: '신한은행',
    accountNumber: '789-654-321',
    accountHolder: '이신한',
  },
];

const AccountList = () => {
  return (
    <>
      <Header title="AccountList" />
      <motion.div
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.5 }}
        whileInView="visible"
      >
        <Accordion>
          <AccordionItem title="신랑측" value="groomSide">
            <motion.div
              animate="visible"
              css={accountListStyle}
              initial="hidden"
              variants={listVariants}
            >
              {groomSideAccounts.length > 0 &&
                groomSideAccounts.map((account, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Account {...account} />
                  </motion.div>
                ))}
            </motion.div>
          </AccordionItem>
          <AccordionItem title="신부측" value="brideSide">
            <motion.div
              animate="visible"
              css={accountListStyle}
              initial="hidden"
              variants={listVariants}
              whileInView="visible"
            >
              {brideSideAccounts.length > 0 &&
                brideSideAccounts.map((account, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Account {...account} />
                  </motion.div>
                ))}
            </motion.div>
          </AccordionItem>
        </Accordion>
      </motion.div>
      <Toaster duration={2000} position="top-center" />
    </>
  );
};

const accountListStyle = css`
  display: flex;
  flex-direction: column;

  > *:not(:last-of-type) {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--gray3);
  }
`;

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

export default AccountList;
