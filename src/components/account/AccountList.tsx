import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { Toaster } from 'sonner';

import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import Account from '@/components/account/Account';
import Header from '@/components/shared/Header';
import { useWeddingStore } from '@/stores/useWeddingStore';

const AccountList = () => {
  const accountInfo = useWeddingStore((state) => state.values.account);
  const groomSide = useWeddingStore(
    (state) => state.values.account.groomSideAccounts,
  );
  const brideSide = useWeddingStore(
    (state) => state.values.account.brideSideAccounts,
  );

  const accountListTitle = accountInfo.title ?? '';
  const accountListSubTitle = accountInfo.subtitle ?? '';
  const groomSideTitle = groomSide?.title ?? '';
  const brideSideTitle = brideSide?.title ?? '';
  const groomSideisExpand = groomSide?.isExpand ?? false;
  const brideSideisExpand = brideSide?.isExpand ?? false;
  const groomSideAccounts = groomSide?.accounts ?? [];
  const brideSideAccounts = brideSide?.accounts ?? [];
  const groomSideDisplay =
    groomSideAccounts[0].accountNumber &&
    groomSideAccounts[0].accountHolder &&
    groomSideAccounts[0].bankName;
  const brideSideDisplay =
    brideSideAccounts[0].accountNumber &&
    brideSideAccounts[0].accountHolder &&
    brideSideAccounts[0].bankName;

  return (
    <>
      <Header title="AccountList" />
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
            groomSideisExpand ? 'groomSide' : '',
            brideSideisExpand ? 'brideSide' : '',
          ].filter(Boolean)}
        >
          {groomSideDisplay && (
            <AccordionItem title={groomSideTitle} value="groomSide">
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
          )}

          {brideSideDisplay && (
            <AccordionItem title={brideSideTitle} value="brideSide">
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
          )}
        </Accordion>
      </motion.div>
      <Toaster duration={2000} position="top-center" />
    </>
  );
};

const titleStyle = css`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--gray12);
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
