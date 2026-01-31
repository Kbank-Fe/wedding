import { css } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';

type AccordionProps = {
  children: ReactNode;
  value?: string[];
};

export const Accordion = ({ children, value }: AccordionProps) => (
  <RadixAccordion.Root css={rootStyle} type="multiple" value={value}>
    {children}
  </RadixAccordion.Root>
);

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
