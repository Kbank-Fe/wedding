import { css } from '@emotion/react';
import { useCallback } from 'react';
import { CgClose } from 'react-icons/cg';

import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseImageInput from '@/components/shared/BaseImageInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { FooterShare, LocalImage } from '@/types/wedding';

const ShareAdmin = () => {
  const shareInfo = useWeddingStore((state) => state.values.share);
  const setField = useWeddingStore((state) => state.setField);
  const setDeep = useWeddingStore((state) => state.setDeep);

  const {
    title = '',
    description = '',
    kakaoShare = true,
    linkShare = true,
    localImageList = [],
  } = shareInfo;

  const imagePreviewList = useImagePreview(localImageList);

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
    setField('share', 'localImageList', [files[0]]);
  };

  const handleRemoveImage = (target: LocalImage) => {
    setDeep((draft) => {
      draft.share.localImageList = draft.share.localImageList.filter((img) => {
        if (img instanceof File && target instanceof File)
          return img.name !== target.name || img.size !== target.size;
        if ('url' in img && 'url' in target) return img.url !== target.url;
        return true;
      });
    });
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

      {localImageList.length > 0 && (
        <div css={previewWrapperStyle}>
          {localImageList.map((file, index) => (
            <div key={index}>
              <div css={previewImageWrapperStyle}>
                <img
                  alt={file.name}
                  css={previewImageStyle}
                  src={imagePreviewList[index]}
                />
                <button
                  css={removeButtonStyle}
                  onClick={() => handleRemoveImage(file)}
                >
                  <CgClose size={8} strokeWidth={1.1} />
                </button>
              </div>
              <span css={previewNameStyle}>{file.name}</span>
            </div>
          ))}
        </div>
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

const previewWrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  margin-top: 1rem;
`;

const previewImageWrapperStyle = css`
  position: relative;
  width: 70px;
  height: 70px;
  border: 1px solid var(--gray4);
  border-radius: 8px;
  overflow: hidden;
`;

const previewImageStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const previewNameStyle = css`
  font-size: 10px;
  color: var(--gray10);
  padding: 0.4rem 0.2rem 0;
  display: inline-block;
  max-width: 70px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const removeButtonStyle = css`
  position: absolute;
  top: 6px;
  right: 6px;
  background: var(--gray11);
  color: var(--gray2);
  border-radius: 50%;
  width: 15px;
  height: 15px;
  cursor: pointer;
  opacity: 0.9;
`;

export default ShareAdmin;
