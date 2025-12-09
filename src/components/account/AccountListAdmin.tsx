import { toast } from 'sonner';

import AccountGroup from '@/components/account/AccountGroup';
import BaseTextArea from '@/components/shared/BaseTextArea';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import Line from '@/components/shared/Line';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { Account, AccountInfo } from '@/types/wedding';
import { isValid } from '@/utils/validate';

const createEmptyAccount = (): Account => ({
  bankName: '',
  accountNumber: '',
  accountHolder: '',
  isKakaopay: false,
  kakaopayUrl: '',
});

const AccountListAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);
  const setField = useWeddingStore((state) => state.setField);

  const account = useWeddingStore((state) => state.values.account);
  const groomSideAccounts = useWeddingStore(
    (state) => state.values.account.groomSideAccounts,
  );
  const brideSideAccounts = useWeddingStore(
    (state) => state.values.account.brideSideAccounts,
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValid(e.currentTarget.value, 'kor')) {
      e.preventDefault();
      return;
    }
    setField('account', 'title', e.currentTarget.value);
  };

  const handleChangeTextAreaInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!isValid(e.currentTarget.value, 'all')) {
      e.preventDefault();
      return;
    }
    setField('account', 'subtitle', e.currentTarget.value);
  };

  const handleChangeAccountInfo =
    (side: 'groom' | 'bride', field: keyof AccountInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (field === 'title' && !isValid(e.currentTarget.value, 'txt')) {
        e.preventDefault();
        return;
      }

      setDeep((draft) => {
        const target =
          side === 'groom'
            ? draft.account.groomSideAccounts
            : draft.account.brideSideAccounts;
        if (!target) return;
        if (field === 'isExpand') {
          target[field] = e.currentTarget.checked;
        } else if (field === 'title') {
          target[field] = e.currentTarget.value;
        }
      });
    };

  const handleAddAccount = (side: 'groom' | 'bride') => () =>
    setDeep((draft) => {
      const target =
        side === 'groom'
          ? draft.account.groomSideAccounts
          : draft.account.brideSideAccounts;
      if (!target) return;

      if (target.accounts.length >= 3) {
        toast.error('계좌는 최대 3개까지 등록할 수 있어요.');
        return;
      }
      target.accounts.push(createEmptyAccount());
    });

  const handleRemoveAccount = (side: 'groom' | 'bride') => (index: number) =>
    setDeep((draft) => {
      const target =
        side === 'groom'
          ? draft.account.groomSideAccounts
          : draft.account.brideSideAccounts;
      if (!target) return;
      if (target.accounts.length > 1) {
        target.accounts.splice(index, 1);
      }
    });

  const handleChangeAccount =
    (side: 'groom' | 'bride') =>
    (index: number, field: keyof Account, type?: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type && !isValid(e.currentTarget.value, type)) {
        e.preventDefault();
        return;
      }

      setDeep((draft) => {
        const target =
          side === 'groom'
            ? draft.account.groomSideAccounts
            : draft.account.brideSideAccounts;
        if (!target) return;
        if (field === 'isKakaopay') {
          const checked = e.currentTarget.checked;
          target.accounts[index].isKakaopay = checked;
          if (!checked) target.accounts[index].kakaopayUrl = '';
        } else {
          target.accounts[index][field] = e.currentTarget.value;
        }
      });
    };

  return (
    <>
      <Field label="제목">
        <BaseTextInput
          maxLength={20}
          placeholder="제목을 입력해주세요"
          value={account.title ?? ''}
          onChange={handleChangeInput}
        />
      </Field>
      <Field label="내용">
        <BaseTextArea
          maxLength={200}
          placeholder="내용을 입력해주세요"
          value={account.subtitle ?? ''}
          onChange={handleChangeTextAreaInput}
        />
      </Field>

      <Line />

      {(['groom', 'bride'] as const).map((side, idx, arr) => {
        const accounts =
          side === 'groom' ? groomSideAccounts : brideSideAccounts;
        const label = side === 'groom' ? '신랑측' : '신부측';

        return (
          <div key={side}>
            <Field label="그룹명">
              <BaseTextInput
                maxLength={15}
                placeholder="그룹명을 입력해주세요"
                value={accounts?.title ?? ''}
                onChange={handleChangeAccountInfo(side, 'title')}
              />
            </Field>
            <AccountGroup
              accounts={accounts?.accounts ?? []}
              handleChange={handleChangeAccount(side)}
              id={side + idx}
              isExpand={accounts?.isExpand ?? false}
              title={accounts?.title || label}
              onAdd={handleAddAccount(side)}
              onRemove={handleRemoveAccount(side)}
              onToggleExpand={handleChangeAccountInfo(side, 'isExpand')}
            />
            {idx < arr.length - 1 && <Line />}
          </div>
        );
      })}
    </>
  );
};

export default AccountListAdmin;
