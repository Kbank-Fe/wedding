import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast, Toaster } from 'sonner';

import AccountGroup from '@/components/account/AccoutGroup';
import BaseTextArea from '@/components/shared/BaseTextArea';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Input from '@/components/shared/Input';
import Line from '@/components/shared/Line';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { Account, AccountInfo, WeddingInfo } from '@/types/wedding';
import { getShare, getUserShareId, saveUserShare } from '@/utils/shares';
import { isValid } from '@/utils/validate';

const createEmptyAccount = (): Account => ({
  bankName: '',
  accountNumber: '',
  accountHolder: '',
  isKakaopay: false,
  kakaopayUrl: '',
});

const AccountListAdmin = () => {
  const { user, uid, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  const setDeep = useWeddingStore((s) => s.setDeep);
  const setField = useWeddingStore((s) => s.setField);
  const values = useWeddingStore((s) => s.values);
  const account = useWeddingStore((s) => s.values.account);
  const groomSideAccounts = useWeddingStore(
    (s) => s.values.account.groomSideAccounts,
  );
  const brideSideAccounts = useWeddingStore(
    (s) => s.values.account.brideSideAccounts,
  );

  useEffect(() => {
    if (!uid) return;

    (async () => {
      try {
        const id = await getUserShareId(uid);
        if (!id) return;

        const doc = await getShare<WeddingInfo>(id);
        if (doc?.data) {
          setDeep((draft) => {
            Object.assign(draft, doc.data);
          });
        }
      } catch (err) {
        console.error('초기 데이터 불러오기 실패:', err);
      }
    })();
  }, [uid, setDeep]);

  useEffect(() => {
    setDeep((draft) => {
      const ensureOne = (accounts?: { accounts: Account[] }) => {
        if (accounts && accounts.accounts.length === 0) {
          accounts.accounts.push(createEmptyAccount());
        }
      };
      ensureOne(draft.account.groomSideAccounts);
      ensureOne(draft.account.brideSideAccounts);
    });
  }, [setDeep]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValid(e.target.value, 'kor')) {
      e.preventDefault();
      return;
    }
    setField('account', 'title', e.target.value);
  };

  const handleChangeTextAreaInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (!isValid(e.target.value, 'all')) {
      e.preventDefault();
      return;
    }
    setField('account', 'subtitle', e.target.value);
  };

  const handleChangeAccountInfo =
    (side: 'groom' | 'bride', field: keyof AccountInfo) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (field === 'title' && !isValid(e.target.value, 'txt')) {
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
          target[field] = e.target.checked;
        } else if (field === 'title') {
          target[field] = e.target.value;
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
      if (type && !isValid(e.target.value, type)) {
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
          const checked = e.target.checked;
          target.accounts[index].isKakaopay = checked;
          if (!checked) target.accounts[index].kakaopayUrl = '';
        } else {
          target.accounts[index][field] = e.target.value;
        }
      });
    };

  const handleSave = async () => {
    if (!user) return;

    try {
      await saveUserShare(uid!, values);
      toast.success('데이터를 저장했어요!');
    } catch (err) {
      console.error(err);
      toast.error('데이터 저장을 실패했어요.');
    }
  };

  if (isLoading) return <p>로딩 중…</p>;
  if (!user) return <p>로그인이 필요합니다.</p>;

  return (
    <>
      <button onClick={() => navigate('/')}>홈으로</button>
      <br />
      <button onClick={handleSave}>저장</button>

      <Input labelText="제목">
        <BaseTextInput
          maxLength={20}
          value={account.title ?? ''}
          onChange={handleChangeInput}
        />
      </Input>
      <Input labelText="내용">
        <BaseTextArea
          maxLength={200}
          value={account.subtitle ?? ''}
          onChange={handleChangeTextAreaInput}
        />
      </Input>

      <Line />

      {(['groom', 'bride'] as const).map((side, idx, arr) => {
        const accounts =
          side === 'groom' ? groomSideAccounts : brideSideAccounts;
        const label = side === 'groom' ? '신랑측' : '신부측';

        return (
          <div key={side}>
            <Input labelText="그룹명">
              <BaseTextInput
                maxLength={15}
                value={accounts?.title ?? ''}
                onChange={handleChangeAccountInfo(side, 'title')}
              />
            </Input>
            <AccountGroup
              accounts={accounts?.accounts ?? []}
              handleChange={handleChangeAccount(side)}
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

      <Toaster duration={2000} position="top-center" />
    </>
  );
};

export default AccountListAdmin;
