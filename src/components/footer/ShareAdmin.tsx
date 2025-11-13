import { css } from '@emotion/react';
import { useCallback } from 'react';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseImageInput from '@/components/shared/BaseImageInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { FooterShare } from '@/types/wedding';

const ShareAdmin = () => {
  const shareInfo = useWeddingStore((state) => state.values.share);
  const setField = useWeddingStore((state) => state.setField);
  const {
    title = '',
    description = '',
    kakaoShare = true,
    linkShare = true,
    file = [],
  } = shareInfo;

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, type, value, checked } = e.currentTarget;
      setField(
        'share',
        id as keyof FooterShare,
        type === 'checkbox' ? checked : value,
      );
    },
    [setField],
  );

  const handleAddFile = (files: File[]) => {
    setField('share', 'file', [files[0]]);
  };

  return (
    <>
      <Field label="제목">
        <BaseTextInput
          id="title"
          maxLength={50}
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={handleChangeInput}
        />
      </Field>

      <Field label="설명">
        <BaseTextInput
          id="description"
          maxLength={50}
          placeholder="설명을 입력해주세요"
          value={description}
          onChange={handleChangeInput}
        />
      </Field>

      <Field label="메인 사진">
        <BaseImageInput multiple={false} onChange={handleAddFile} />
      </Field>

      {file && file[0] && (
        <Field label="파일명">
          <p css={imgNameStyle}>{file[0].name}</p>
        </Field>
      )}

      <Field label="공유 버튼">
        <BaseCheckBoxInput
          checkboxLabel="카카오톡 공유"
          checked={kakaoShare}
          id="kakaoShare"
          onChange={handleChangeInput}
        />
        <BaseCheckBoxInput
          checkboxLabel="링크 공유"
          checked={linkShare}
          id="linkShare"
          onChange={handleChangeInput}
        />
      </Field>
    </>
  );
};

const imgNameStyle = css`
  font-size: 0.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default ShareAdmin;
