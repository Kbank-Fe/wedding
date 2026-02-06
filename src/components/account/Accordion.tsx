import { css } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';

type AccordionProps = {
  children: ReactNode;
  defaultValue?: string[];
};

export const Accordion = ({ children, defaultValue }: AccordionProps) => (
  <RadixAccordion.Root
    css={rootStyle}
    defaultValue={defaultValue}
    type="multiple"
  >
    {children}
  </RadixAccordion.Root>
);

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
