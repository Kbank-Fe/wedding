import { css, keyframes } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

type AccordionItemProps = {
  value: string;
  title: string;
  children: ReactNode;
};

export const AccordionItem = ({
  value,
  title,
  children,
}: AccordionItemProps) => (
  <RadixAccordion.Item css={itemStyle} value={value}>
    <RadixAccordion.Header>
      <RadixAccordion.Trigger css={triggerStyle}>
        {title}
        <ChevronDown className="icon" size={16} />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
    <RadixAccordion.Content css={contentStyle}>
      {children}
    </RadixAccordion.Content>
  </RadixAccordion.Item>
);

const slideDown = keyframes`
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
`;

const itemStyle = css`
  border: 1px solid var(--gray3);
  border-radius: 6px;
  overflow: hidden;
  background: #f9f9f9;
`;

const triggerStyle = css`
  width: 100%;
  padding: 12px 16px;
  background: var(--gray3);
  border: none;
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  .icon {
    transition: transform 0.3s ease;
  }

  &[data-state='open'] .icon {
    transform: rotate(180deg);
  }
`;

const contentStyle = css`
  overflow: hidden;
  font-size: 0.95rem;
  background: var(--gray1);
  line-height: 1.5;

  &[data-state='open'] {
    animation: ${slideDown} 0.25s ease-out;
  }

  &[data-state='closed'] {
    animation: ${slideUp} 0.2s ease-in;
    padding-top: 0;
    padding-bottom: 0;
  }
`;
