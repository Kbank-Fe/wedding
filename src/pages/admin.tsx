import { css } from '@emotion/react';
import { Navigate, useNavigate } from 'react-router';
import { toast, Toaster } from 'sonner';

import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWeddingInfo } from '@/hooks/useWeddingInfo';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { SavedImage, ShowCheckbox } from '@/types/wedding';
import { adminList } from '@/utils/adminList';
import { saveUserShare } from '@/utils/shares';
import { uploadImageToStorage } from '@/utils/storage';

const AdminPage = () => {
  const navigate = useNavigate();

  const setDeep = useWeddingStore((state) => state.setDeep);
  const setField = useWeddingStore((state) => state.setField);
    
  const { user, uid, isLoading: userLoading } = useCurrentUser();
  const { isLoading: infoLoading, notFound } = useWeddingInfo({ uid }, setDeep);
  const { localImageList } = useWeddingStore((state) => state.values.gallery);

  const showCheckbox = useWeddingStore((state) => state.values.showCheckbox);

  if (!userLoading && !uid) {
    return <Navigate replace to="/404" />;
  }

  if (userLoading || infoLoading) {
    return <LoadingSpinner />;
  }

  if (notFound) {
    return <Navigate replace to="/404" />;
  }
  const handleSetImageList = async (uid: string) => {
    const { savedImageList, localImageList } =
      useWeddingStore.getState().values.gallery;

    // 새로 추가된 파일만 추출
    const addedFiles = localImageList.filter(
      (img): img is File => img instanceof File,
    );

    // 삭제된 SavedImage 추출
    const deletedSavedImages = savedImageList.filter(
      (saved) =>
        !localImageList.some(
          (img) => !(img instanceof File) && img.url === saved.url,
        ),
    );

    if (addedFiles.length === 0 && deletedSavedImages.length === 0) return; // 변화 없으면 skip

    try {
      // 새 파일 업로드
      const metas: SavedImage[] = await Promise.all(
        addedFiles.map((file) => uploadImageToStorage(file, uid)),
      );

      // DB 반영 (삭제 제외 + 신규 추가)
      setDeep((draft) => {
        draft.gallery.savedImageList = [
          ...savedImageList.filter(
            (img) => !deletedSavedImages.some((del) => del.url === img.url),
          ),
          ...metas,
        ];
      });
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생', error);
      throw new Error('image_upload_failed');
    }
  };

  const handleSave = async () => {
    if (!user || !uid) return;

    try {
      await handleSetImageList(uid);

      const values = useWeddingStore.getState().values;
      const shareId = await saveUserShare(uid, values);

      toast.success('데이터를 저장했어요!');
      setTimeout(() => navigate(`/${shareId}`), 1500);
    } catch (error) {
      console.error(error);
      toast.error('데이터 저장을 실패했어요.');
    }
  };

  const handleCheckboxChange = (key: keyof ShowCheckbox) => {
    const current = showCheckbox[key] ?? false;
    setField('showCheckbox', key, !current);
  };

  return (
    <PageLayout>
      <Section>
        {adminList.length > 0 && (
          <Accordion>
            {adminList.map(({ title, value, component: Component }) => (
              <div key={value} css={divWrapStyle}>
                <BaseCheckBoxInput
                  checked={showCheckbox[value] ?? false}
                  css={checkboxStyle}
                  onChange={() => handleCheckboxChange(value)}
                />
                <div css={accordionItemStyle}>
                  <AccordionItem title={title} value={value}>
                    <Component />
                  </AccordionItem>
                </div>
              </div>
            ))}
          </Accordion>
        )}
        <button css={buttonStyle} onClick={handleSave}>
          저장하기
        </button>
      </Section>
      <Toaster duration={2000} position="top-center" />
    </PageLayout>
  );
};

const buttonStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 10px;
  border: 1px solid var(--gray3);
  background: var(--gray2);
  color: var(--gray12);
  cursor: pointer;
  margin-top: 1rem;
  color: var(--gray11);

  &:hover {
    background: var(--gray3);
    font-weight: 600;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const divWrapStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const checkboxStyle = css`
  flex-shrink: 0;
  margin-top: 1.2rem;
`;

const accordionItemStyle = css`
  flex: 1;
`;

export default AdminPage;
