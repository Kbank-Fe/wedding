import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { TfiLayoutLineSolid } from 'react-icons/tfi';
import { Toaster } from 'sonner';

import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import Account from '@/components/account/Account';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { Account as AccountType } from '@/types/wedding';

const AccountList = () => {
  const accountInfo = useWeddingStore((state) => state.values.account);

  const {
    title: accountListTitle = '',
    subtitle: accountListSubTitle = '',
    groomSideAccounts: groomSide = { title: '', isExpand: false, accounts: [] },
    brideSideAccounts: brideSide = { title: '', isExpand: false, accounts: [] },
  } = accountInfo;

  const hasValidAccount = (accounts: AccountType[]) =>
    accounts.length > 0 &&
    accounts[0].accountNumber &&
    accounts[0].accountHolder &&
    accounts[0].bankName;

  const renderSide = (value: string, title: string, accounts: AccountType[]) =>
    hasValidAccount(accounts) && (
      <AccordionItem title={title} value={value}>
        <motion.div
          css={accountListStyle}
          initial="hidden"
          variants={listVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          {accounts.map((account) => (
            <motion.div key={account.accountNumber} variants={itemVariants}>
              <Account {...account} />
            </motion.div>
          ))}
        </motion.div>
      </AccordionItem>
    );

  return (
    <>
      <div css={headerStyle}>
        <TfiLayoutLineSolid size={24} />
      </div>
      <motion.div
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, amount: 0.5 }}
        whileInView="visible"
      >
        <p css={titleStyle}>{accountListTitle}</p>
        <p css={subtitleStyle}>{accountListSubTitle}</p>

        <Accordion
          defaultValue={[
            groomSide.isExpand ? 'groomSide' : '',
            brideSide.isExpand ? 'brideSide' : '',
          ].filter(Boolean)}
        >
          {renderSide('groomSide', groomSide.title ?? '', groomSide.accounts)}
          {renderSide('brideSide', brideSide.title ?? '', brideSide.accounts)}
        </Accordion>
      </motion.div>
      <Toaster duration={2000} position="top-center" />
    </>
  );
};

const headerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--teal7);
`;

const titleStyle = css`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--gray11);
  margin-bottom: 0.5rem;
  letter-spacing: -0.01em;
`;

const subtitleStyle = css`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  color: var(--gray11);
  margin-bottom: 2rem;
  line-height: 1.6;
  white-space: pre-line;
`;

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
