/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import * as RadixAccodion from '@radix-ui/react-accordion';
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
  <RadixAccodion.Item css={itemStyle} value={value}>
    <RadixAccodion.Header>
      <RadixAccodion.Trigger css={triggerStyle}>
        {title}
        <ChevronDown className="icon" />
      </RadixAccodion.Trigger>
    </RadixAccodion.Header>
    <RadixAccodion.Content css={contentStyle}>{children}</RadixAccodion.Content>
  </RadixAccodion.Item>
);

export const Accordion = ({ children }: { children: ReactNode }) => (
  <RadixAccodion.Root css={rootStyle} type="multiple">
    {children}
  </RadixAccodion.Root>
);
const slideDown = keyframes`
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
`;

const rootStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const itemStyle = css`
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  background: #f9f9f9;
`;

const triggerStyle = css`
  width: 100%;
  padding: 12px 16px;
  background: var(--gray2);
  border: none;
  font-size: 1rem;
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
  background: white;
  line-height: 1.5;
  padding: 0 16px;

  &[data-state='open'] {
    animation: ${slideDown} 0.25s ease-out;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  &[data-state='closed'] {
    animation: ${slideUp} 0.2s ease-in;
    padding-top: 0;
    padding-bottom: 0;
  }
`;
