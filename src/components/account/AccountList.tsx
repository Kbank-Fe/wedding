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

  const hasValidAccount = (accounts: AccountType[]) => {
    if (!accounts.length) return false;

    const { accountNumber, accountHolder, bankName } = accounts[0];

    return (
      Boolean(accountNumber?.trim()) ||
      Boolean(accountHolder?.trim()) ||
      Boolean(bankName?.trim())
    );
  };

  const renderSide = (value: string, title: string, accounts: AccountType[]) =>
    hasValidAccount(accounts) && (
      <AccordionItem title={title} value={value}>
        <div css={accountListStyle}>
          {accounts.map((account, idx) => (
            <div key={idx}>
              <Account {...account} />
            </div>
          ))}
        </div>
      </AccordionItem>
    );

  return (
    <>
      <div css={headerStyle}>
        <TfiLayoutLineSolid color="#87BBBA" size={24} strokeWidth={1} />
      </div>

      <motion.div
        initial="hidden"
        variants={containerVariants}
        viewport={{ amount: 0.5 }}
        whileInView="visible"
      >
        <h3 css={titleStyle}>{accountListTitle}</h3>
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
  margin: 0 auto 1rem;
`;

const titleStyle = css`
  text-align: center;
  color: var(--gray11);
  margin-bottom: 0.8rem;
`;

const subtitleStyle = css`
  text-align: center;
  font-size: 13px;
  font-weight: 400;
  color: var(--gray10);
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

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
} as const;

export default AccountList;
