import { css } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';

type AccordionProps = {
  children: ReactNode;
};

export const Accordion = ({ children }: AccordionProps) => (
  <RadixAccordion.Root css={rootStyle} type="multiple">
    {children}
  </RadixAccordion.Root>
);

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
