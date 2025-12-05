import { css, keyframes } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';
import { LuChevronDown } from 'react-icons/lu';

import { useWeddingStore } from '@/stores/useWeddingStore';
import type { ShowCheckbox } from '@/types/wedding';

import BaseCheckBoxInput from '../shared/BaseCheckBoxInput';

type AccordionItemProps = {
  value: keyof ShowCheckbox;
  title: string;
  children: ReactNode;
  required: boolean;
};

export const AccordionItem = ({
  value,
  title,
  children,
  required,
}: AccordionItemProps) => {
  const showCheckbox = useWeddingStore((state) => state.values.showCheckbox);
  const setField = useWeddingStore((state) => state.setField);

  const handleCheckboxChange = (key: keyof ShowCheckbox) => {
    const current = showCheckbox[key] ?? false;
    setField('showCheckbox', key, !current);
  };

  return (
    <RadixAccordion.Item css={itemStyle} value={value}>
      <RadixAccordion.Header>
        <div css={triggerRowStyle}>
          {!required ? (
            <BaseCheckBoxInput
              checked={showCheckbox[value] ?? false}
              css={checkboxStyle}
              id={value}
              onChange={() => handleCheckboxChange(value)}
            />
          ) : (
            <div css={checkboxPlaceholderStyle} />
          )}
          <RadixAccordion.Trigger css={triggerStyle}>
            {title}
            <LuChevronDown className="icon" size={15} />
          </RadixAccordion.Trigger>
        </div>
      </RadixAccordion.Header>
      <RadixAccordion.Content css={contentStyle}>
        {children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
};

const slideDown = keyframes`
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
`;

const itemStyle = css`
  border: 1px solid var(--gray4);
  border-radius: 12px;
  overflow: hidden;
  background: var(--gray2);
  width: 100%;
  box-sizing: border-box;
`;

const triggerRowStyle = css`
  display: flex;
  align-items: center;
  padding-left: 0.9rem;
`;

const triggerStyle = css`
  width: 100%;
  padding: 0.9rem;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--gray11);
  font-family: 'Wedding';

  svg {
    transition: transform 0.3s ease;
    color: var(--gray10);
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`;

const contentStyle = css`
  width: 100%;
  overflow: hidden;
  font-size: 0.95rem;
  background: var(--gray1);
  border-top: 1px solid var(--gray4);
  padding: 1rem;

  &[data-state='open'] {
    animation: ${slideDown} 0.25s ease-out;
  }

  &[data-state='closed'] {
    animation: ${slideUp} 0.2s ease-in-out;
    padding-bottom: 0;
  }
`;

const checkboxStyle = css`
  background-color: red;
`;

const checkboxPlaceholderStyle = css`
  width: 20px;
  height: 20px;
`;
