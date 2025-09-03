import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import AccountGroup from '@/components/account/AccoutGroup';
import BaseTextArea from '@/components/shared/BaseTextArea';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Input from '@/components/shared/Input';
import Line from '@/components/shared/Line';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { Account, AccountInfo } from '@/types/wedding';

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

  const accountInfo = useWeddingStore((state) => state.values.account);

  const groomSideAccounts = useWeddingStore(
    (state) => state.values.account.groomSideAccounts,
  );
  const brideSideAccounts = useWeddingStore(
    (state) => state.values.account.brideSideAccounts,
  );

  const navigate = useNavigate();

  useEffect(() => {
    setDeep((draft) => {
      const ensureOne = (accounts?: { accounts: Account[] }) => {
        if (!accounts) return;
        if (accounts.accounts.length === 0) {
          accounts.accounts.push(createEmptyAccount());
        }
      };
      ensureOne(draft.account.groomSideAccounts);
      ensureOne(draft.account.brideSideAccounts);
    });
  }, [setDeep]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField('account', 'title', e.target.value);
  };

  const handleChangeTextAreaInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setField('account', 'subtitle', e.target.value);
  };

  const handleChangeAccountInfo =
    (side: 'groom' | 'bride', field: keyof AccountInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        const target =
          side === 'groom'
            ? draft.account.groomSideAccounts
            : draft.account.brideSideAccounts;
        if (!target) return;
        if (field === 'isExpand') {
          target[field] = e.target.checked;
        } else if (field === 'title') {
          target[field] = e.target.value;
        }
      });
    };

  const handleAddAccount = (side: 'groom' | 'bride') => () => {
    setDeep((draft) => {
      const target =
        side === 'groom'
          ? draft.account.groomSideAccounts
          : draft.account.brideSideAccounts;
      if (!target) return;
      target.accounts.push(createEmptyAccount());
    });
  };

  const handleRemoveAccount = (side: 'groom' | 'bride') => (index: number) => {
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
  };

  const handleChangeAccount =
    (side: 'groom' | 'bride') =>
    (index: number, field: keyof Account) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        const target =
          side === 'groom'
            ? draft.account.groomSideAccounts
            : draft.account.brideSideAccounts;
        if (!target) return;
        if (field === 'isKakaopay') {
          const checked = e.target.checked;
          target.accounts[index].isKakaopay = checked;
          if (!checked) target.accounts[index].kakaopayUrl = '';
        } else {
          target.accounts[index][field] = e.target.value;
        }
      });
    };

  return (
    <>
      <button onClick={() => navigate('/')}>홈으로</button>

      <Input labelText="제목">
        <BaseTextInput
          value={accountInfo.title ?? ''}
          onChange={handleChangeInput}
        />
      </Input>
      <Input labelText="내용">
        <BaseTextArea
          value={accountInfo.subtitle ?? ''}
          onChange={handleChangeTextAreaInput}
        />
      </Input>

      <Line />

      <Input labelText="그룹명">
        <BaseTextInput
          value={groomSideAccounts?.title ?? ''}
          onChange={handleChangeAccountInfo('groom', 'title')}
        />
      </Input>
      <AccountGroup
        accounts={groomSideAccounts?.accounts ?? []}
        handleChange={handleChangeAccount('groom')}
        isExpand={groomSideAccounts?.isExpand ?? false}
        title={groomSideAccounts?.title || '신랑 계좌'}
        onAdd={handleAddAccount('groom')}
        onRemove={handleRemoveAccount('groom')}
        onToggleExpand={handleChangeAccountInfo('groom', 'isExpand')}
      />

      <Line />

      <Input labelText="그룹명">
        <BaseTextInput
          value={brideSideAccounts?.title ?? ''}
          onChange={handleChangeAccountInfo('bride', 'title')}
        />
      </Input>
      <AccountGroup
        accounts={brideSideAccounts?.accounts ?? []}
        handleChange={handleChangeAccount('bride')}
        isExpand={brideSideAccounts?.isExpand ?? false}
        title={brideSideAccounts?.title || '신부 계좌'}
        onAdd={handleAddAccount('bride')}
        onRemove={handleRemoveAccount('bride')}
        onToggleExpand={handleChangeAccountInfo('bride', 'isExpand')}
      />
    </>
  );
};

export default AccountListAdmin;
