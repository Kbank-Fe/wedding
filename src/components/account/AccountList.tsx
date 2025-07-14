import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import { itemVariants, listVariants } from '@/animations/accountListVariants';

import Account from './Account';

const accounts = [
  { bankName: '기업은행', accountNumber: '640-022316-01-011' },
  { bankName: '국민은행', accountNumber: '123-456-789012' },
  { bankName: '신한은행', accountNumber: '987-654-321098' },
];

const AccountList = () => (
  <motion.div
    animate="visible"
    css={accountListStyle}
    initial="hidden"
    variants={listVariants}
  >
    {accounts.map((account, index) => (
      <motion.div key={index} variants={itemVariants}>
        <Account {...account} />
      </motion.div>
    ))}
  </motion.div>
);

const accountListStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export default AccountList;
