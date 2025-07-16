import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';

import Account from '@/components/account/Account';
import Header from '@/components/Header';

const accounts = [
  { bankName: '기업은행', accountNumber: '640-022316-01-011' },
  { bankName: '국민은행', accountNumber: '123-456-789012' },
  { bankName: '신한은행', accountNumber: '987-654-321098' },
];

const AccountList = () => {
  return (
    <>
      <Header title="AccountList" />
      <Toaster duration={2000} position="top-center" />
      <motion.div
        animate="visible"
        css={accountListStyle}
        initial="hidden"
        variants={listVariants}
        whileInView="visible"
      >
        {accounts.map((account, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Account {...account} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

const accountListStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export default AccountList;
