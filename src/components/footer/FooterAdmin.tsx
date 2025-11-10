import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';

const FooterAdmin = () => {
  return (
    <>
      <Field label="제목">
        <BaseCheckBoxInput
          checkboxLabel="이름 자동 넣기"
          checked={false}
          id=""
        />
        <BaseTextInput maxLength={20} />
      </Field>

      <Field label="설명">
        <BaseTextInput maxLength={20} />
      </Field>

      <Field label="공유 버튼">
        <BaseCheckBoxInput checkboxLabel="카카오톡 공유" checked={true} id="" />
        <BaseCheckBoxInput checkboxLabel="링크 공유" checked={true} id="" />
      </Field>
    </>
  );
};

export default FooterAdmin;
