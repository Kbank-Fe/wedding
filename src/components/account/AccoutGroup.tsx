import { css } from '@emotion/react';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import type { Account } from '@/types/wedding';

type AccountGroupProps = {
  title: string;
  accounts: Account[];
  handleChange: (
    index: number,
    field: keyof Account,
    type?: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  isExpand: boolean;
  onToggleExpand: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AccountGroup = ({
  title,
  accounts,
  handleChange,
  onAdd,
  onRemove,
  isExpand,
  onToggleExpand,
}: AccountGroupProps) => (
  <div css={groupWrapperStyle}>
    <div css={groupHeaderStyle}>
      <span css={groupTitleStyle}>{title}</span>
      <div css={groupActionsStyle}>
        <BaseCheckBoxInput
          checkboxLabel="펼치기"
          checked={isExpand}
          onChange={onToggleExpand}
        />

        <button css={addButtonStyle} onClick={onAdd}>
          ＋
        </button>
      </div>
    </div>

    {accounts.map((acc, i) => (
      <div key={i} css={accountBlockStyle}>
        <div css={accountHeaderStyle}>
          <span>계좌 {i + 1}</span>
          {accounts.length > 1 && (
            <button css={removeButtonStyle} onClick={() => onRemove(i)}>
              －
            </button>
          )}
        </div>

        <Field label="은행명">
          <BaseTextInput
            maxLength={15}
            value={acc.bankName}
            onChange={handleChange(i, 'bankName', 'kor')}
          />
        </Field>

        <Field label="계좌번호">
          <BaseTextInput
            maxLength={20}
            value={acc.accountNumber}
            onChange={handleChange(i, 'accountNumber', 'num')}
          />
        </Field>

        <Field label="예금주">
          <BaseTextInput
            maxLength={10}
            value={acc.accountHolder}
            onChange={handleChange(i, 'accountHolder', 'kor')}
          />
        </Field>

        {acc.isKakaopay && (
          <Field label="송금 링크">
            <BaseTextInput
              maxLength={50}
              placeholder="https://qr.kakaopay.com/..."
              value={acc.kakaopayUrl ?? ''}
              onChange={handleChange(i, 'kakaopayUrl', 'url')}
            />
          </Field>
        )}

        <BaseCheckBoxInput
          checkboxLabel="카카오페이 사용"
          checked={acc.isKakaopay ?? false}
          onChange={handleChange(i, 'isKakaopay')}
        />
      </div>
    ))}
  </div>
);

const groupWrapperStyle = css`
  margin-top: 1.5rem;
`;

const groupHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const groupTitleStyle = css`
  font-weight: bold;
  font-size: 0.93rem;
  color: var(--gray12);
`;

const groupActionsStyle = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const addButtonStyle = css`
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  color: var(--gray11);

  &:hover {
    color: var(--blue11);
  }
`;

const accountBlockStyle = css`
  margin-bottom: 1.25rem;
  padding: 0.75rem;
  border: 1px solid var(--gray6);
  border-radius: 0.5rem;
`;

const accountHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const removeButtonStyle = css`
  border: none;
  background: transparent;
  font-size: 1.12rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  color: var(--gray10);

  &:hover {
    color: var(--red11);
  }
`;

export default AccountGroup;
