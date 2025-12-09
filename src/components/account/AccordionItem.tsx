import { css } from '@emotion/react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';
import { LuChevronDown } from 'react-icons/lu';

import { useWeddingStore } from '@/stores/useWeddingStore';
import type { ActiveCheckbox } from '@/types/wedding';

import BaseCheckBoxInput from '../shared/BaseCheckBoxInput';

type AccordionItemProps = {
  value: keyof ActiveCheckbox | string;
  title: string;
  children: ReactNode;
  showCheckbox?: boolean;
};

export const AccordionItem = ({
  value,
  title,
  children,
  showCheckbox,
}: AccordionItemProps) => {
  const activeCheckbox = useWeddingStore(
    (state) => state.values.activeCheckbox,
  );
  const setField = useWeddingStore((state) => state.setField);

  const handleCheckboxChange = (key: keyof ActiveCheckbox) => {
    const current = activeCheckbox[key] ?? false;
    setField('activeCheckbox', key, !current);
  };

  const key = value as keyof ActiveCheckbox;

  return (
    <RadixAccordion.Item css={itemStyle} value={key}>
      <RadixAccordion.Header>
        <div css={triggerRowStyle}>
          {showCheckbox && (
            <div css={checkboxWrapperStyle}>
              <BaseCheckBoxInput
                checked={activeCheckbox[key] ?? false}
                id={key}
                onChange={() => handleCheckboxChange(key)}
              />
            </div>
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
  line-height: 1;

  svg {
    margin-left: auto;
    will-change: transform;
    transition: transform 0.3s ease;
    color: var(--gray10);
  }

  &[data-state='open'] svg {
    transform: rotate(180deg);
  }
`;

const checkboxWrapperStyle = css`
  padding-left: 0.9rem;
`;

const contentStyle = css`
  width: 100%;
  overflow: hidden;
  font-size: 0.95rem;
  background: var(--gray1);
  border-top: 1px solid var(--gray4);
  padding: 1rem;
  transform-origin: top;

  &[data-state='open'],
  &[data-state='closed'] {
    will-change: transform, opacity;
  }

  &[data-state='open'] {
    animation: accordion-open 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }

  &[data-state='closed'] {
    animation: accordion-close 0.2s cubic-bezier(0.3, 0, 0.5, 1) forwards;
  }

  @keyframes accordion-open {
    0% {
      opacity: 0;
      transform: scaleY(0.92);
    }
    100% {
      opacity: 1;
      transform: scaleY(1);
    }
  }

  @keyframes accordion-close {
    0% {
      opacity: 1;
      transform: scaleY(1);
    }
    100% {
      opacity: 0;
      transform: scaleY(0.9);
    }
  }
`;
