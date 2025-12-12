import { css } from '@emotion/react';
import { CgClose } from 'react-icons/cg';

import BaseImageInput from '@/components/shared/BaseImageInput';
import Field from '@/components/shared/Field';
import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { LocalImage } from '@/types/wedding';

type BaseImageInputPreviewProps = {
  //   key: string;
  label: string;
  multiple: boolean;
};

const BaseImageInputPreview = ({
  //   key,
  label = '사진',
  multiple = true,
}: BaseImageInputPreviewProps) => {
  const { localImageList = [] } = useWeddingStore(
    (state) => state.values.theme,
  );
  const setDeep = useWeddingStore((state) => state.setDeep);

  const imagePreviewList = useImagePreview(localImageList);

  const handleAddFiles = (files: File[]) => {
    setDeep((draft) => {
      draft.theme.localImageList.push(...files);
    });
  };

  const handleRemoveImage = (target: LocalImage) => {
    setDeep((draft) => {
      draft.theme.localImageList = draft.theme.localImageList.filter((img) => {
        if (img instanceof File && target instanceof File)
          return img.name !== target.name || img.size !== target.size;
        if ('url' in img && 'url' in target) return img.url !== target.url;
        return true;
      });
    });
  };

  return (
    <>
      <Field label={label}>
        <BaseImageInput multiple={multiple} onChange={handleAddFiles} />
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

export default BaseImageInputPreview;
