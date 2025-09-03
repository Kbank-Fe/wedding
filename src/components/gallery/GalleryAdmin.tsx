import { css } from '@emotion/react';
import { X } from 'lucide-react';

import Input from '@/components/shared/Input';
import { useWeddingStore } from '@/stores/useWeddingStore';

import BaseImageInput from '../shared/BaseImageInput';

const GalleryAdmin = () => {
  const { localImageList } = useWeddingStore((state) => state.values.gallery);
  const setDeep = useWeddingStore((state) => state.setDeep);

  const handleAddFiles = (files: File[]) => {
    setDeep((draft) => {
      draft.gallery.localImageList.push(...files);
    });
  };

  const handleRemoveFiles = (index: number) => () => {
    setDeep((draft) => {
      draft.gallery.localImageList.splice(index, 1);
    });
  };

  return (
    <>
      <Input labelText="사진">
        <BaseImageInput onChange={handleAddFiles} />
      </Input>
      {localImageList.length > 0 && (
        <div css={previewWrapperStyle}>
          {localImageList.map((file, i) => (
            <div key={i}>
              <div css={previewImageWrapperStyle}>
                <img
                  alt={file.name}
                  css={previewImageStyle}
                  src={URL.createObjectURL(file)}
                />
                <button css={removeButtonStyle} onClick={handleRemoveFiles(i)}>
                  <X size={10} />
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
  gap: 15px;
`;

const previewImageWrapperStyle = css`
  position: relative;
  width: 110px;
  height: 110px;
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
  font-size: 12px;
  color: var(--gray10);
  padding: 0.4rem 0.2rem 0;
  display: inline-block;
  max-width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const removeButtonStyle = css`
  position: absolute;
  top: 6px;
  right: 6px;
  background: var(--gray12);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  opacity: 0.6;
`;

export default GalleryAdmin;
