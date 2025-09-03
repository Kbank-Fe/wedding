import BaseTextArea from '@/components/shared/BaseTextArea';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Input from '@/components/shared/Input';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type AccountInfo from '@/types/wedding';

const AccountListAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);
  const setField = useWeddingStore((state) => state.setField);

  const groomSideAccounts = useWeddingStore(
    (state) => state.values.account.groomSideAccounts,
  );
  const brideSideAccounts = useWeddingStore(
    (state) => state.values.account.brideSideAccounts,
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField('account', 'title', e.target.value);
  };

  const handleChangeTextAreaInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setField('account', 'subtitle', e.target.value);
  };

  const handleChangeGroomTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeep((draft) => {
      if (!draft.account.groomSideAccounts) return;
      draft.account.groomSideAccounts.title = e.target.value;
    });
  };

  const handleChangeGroomBankName = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDeep((draft) => {
      if (!draft.account.groomSideAccounts) return;
      console.log(e.target);
      draft.account.groomSideAccounts.accounts.push({
        bankName: '',
        accountNumber: '',
        accountHolder: '',
        isKakaopay: false,
        kakaopayUrl: '',
      });
    });
  };

  console.log(
    'title : ',
    useWeddingStore((state) => state.values.account.title),
  );
  console.log(
    'subtitle : ',
    useWeddingStore((state) => state.values.account.subtitle),
  );
  console.log(
    'groomSide : ',
    useWeddingStore((state) => state.values.account.groomSideAccounts),
  );

  return (
    <>
      <Input labelText="제목">
        <BaseTextInput name="title" onChange={handleChangeInput} />
      </Input>
      <Input labelText="내용">
        <BaseTextArea onChange={handleChangeTextAreaInput} />
      </Input>

      {groomSideAccounts?.accounts.map((acc, i) => (
        <></>
      ))}

      <Input labelText="그룹명">
        <BaseTextInput onChange={handleChangeGroomTitle} />
      </Input>
      <Input labelText="은행명">
        <BaseTextInput name="bankName" onChange={handleChangeGroomBankName} />
      </Input>
    </>
  );
};

export default AccountListAdmin;
