import { css } from '@emotion/react';
import { CgClose } from 'react-icons/cg';
import { RiMenuAddLine } from 'react-icons/ri';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import type { Account } from '@/types/wedding';

type AccountGroupProps = {
  id: string;
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
  id,
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
      <div css={groupActionsStyle}>
        <span css={groupTitleStyle}>{title}</span>
        <BaseCheckBoxInput
          checkboxLabel="펼치기"
          checked={isExpand}
          id={id}
          onChange={onToggleExpand}
        />
      </div>
      <button css={buttonStyle} onClick={onAdd}>
        <RiMenuAddLine size={15} />
      </button>
    </div>

    {accounts.map((acc, index) => (
      <div key={index} css={accountBlockStyle}>
        <div css={accountHeaderStyle}>
          {accounts.length > 1 && (
            <button css={buttonStyle} onClick={() => onRemove(index)}>
              <CgClose size={12} strokeWidth={1.1} />
            </button>
          )}
        </div>

        <Field label="예금주명">
          <BaseTextInput
            maxLength={10}
            placeholder="예금주명을 입력해주세요"
            value={acc.accountHolder}
            onChange={handleChange(index, 'accountHolder', 'kor')}
          />
        </Field>

        <Field label="은행명">
          <BaseTextInput
            maxLength={15}
            placeholder="은행명을 입력해주세요"
            value={acc.bankName}
            onChange={handleChange(index, 'bankName', 'kor')}
          />
        </Field>

        <Field label="계좌번호">
          <BaseTextInput
            maxLength={20}
            placeholder="계좌번호를 입력해주세요"
            value={acc.accountNumber}
            onChange={handleChange(index, 'accountNumber', 'num')}
          />
        </Field>

        <Field label="카카오페이">
          <BaseCheckBoxInput
            checkboxLabel=""
            checked={acc.isKakaopay ?? false}
            id={id + index}
            onChange={handleChange(index, 'isKakaopay')}
          />
        </Field>

        {acc.isKakaopay && (
          <Field label="송금 링크">
            <BaseTextInput
              helperText="카카오페이 > 송금 > 내 QR > 링크 복사에서 URL을 확인할 수 있어요"
              maxLength={50}
              placeholder="https://qr.kakaopay.com/..."
              value={acc.kakaopayUrl ?? ''}
              onChange={handleChange(index, 'kakaopayUrl', 'url')}
            />
          </Field>
        )}
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
  margin: 0 0.3rem 0.7rem;
`;

const groupTitleStyle = css`
  font-size: 13px;
  font-weight: 700;
`;

const groupActionsStyle = css`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const accountBlockStyle = css`
  background-color: var(--gray2);
  border-radius: 6px;
  padding: 0.2rem 0.8rem 0.3rem;
  margin-bottom: 1rem;
`;

const accountHeaderStyle = css`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0.6rem 0.2rem;
`;

const buttonStyle = css`
  color: var(--gray11);

  &:hover {
    color: var(--gray12);
  }

  &:active {
    color: var(--gray12);
  }
`;

export default AccountGroup;
