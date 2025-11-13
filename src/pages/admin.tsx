import { css } from '@emotion/react';
import { useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { toast, Toaster } from 'sonner';

import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import ButtonContentModal from '@/components/shared/ButtonContentModal';
import Layout from '@/components/shared/Layout';
import LoadingBackdrop from '@/components/shared/LoadingBackdrop';
import WeddingPreview from '@/components/shared/WeddingPreview';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWeddingInfo } from '@/hooks/useWeddingInfo';
import { useViewportStore } from '@/stores/useViewportStore';
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

  const [loading, setLoadingOpen] = useState(false);
  const isSavingRef = useRef(false);

  const shouldFetch = !!uid;
  const { isLoading: infoLoading, notFound } = useWeddingInfo(
    shouldFetch ? { uid } : { uid: null },
    shouldFetch ? setDeep : undefined,
  );

  const isMobile = useViewportStore((state) => state.isMobile);
  const showCheckbox = useWeddingStore((state) => state.values.showCheckbox);

  if (userLoading) return <LoadingBackdrop open={userLoading} />;
  if (!uid) return <Navigate replace to="/404" />;
  if (infoLoading) return <LoadingBackdrop open={infoLoading} />;
  if (notFound) return <Navigate replace to="/404" />;

  const handleSetImageList = async (uid: string) => {
    const gallery = useWeddingStore.getState().values.gallery;
    const savedImageList = gallery.savedImageList ?? [];
    const localImageList = gallery.localImageList ?? [];

    const addedFiles = localImageList.filter(
      (img): img is File => img instanceof File,
    );

    const deletedSavedImages = savedImageList.filter(
      (saved) =>
        !localImageList.some(
          (img) => !(img instanceof File) && img.url === saved.url,
        ),
    );

    if (addedFiles.length === 0 && deletedSavedImages.length === 0) return;

    try {
      const metas: SavedImage[] = await Promise.all(
        addedFiles.map((file) => uploadImageToStorage(file, uid)),
      );

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
    if (!user || !uid || isSavingRef.current) return;
    isSavingRef.current = true;
    setLoadingOpen(true);

    try {
      await handleSetImageList(uid);
      const values = useWeddingStore.getState().values;
      const shareId = await saveUserShare(uid, values);

      useWeddingStore.setState((state) => {
        state.values.gallery.localImageList = [];
      });

      toast.success('데이터를 저장했어요!');
      setTimeout(() => navigate(`/${shareId}`), 1500);
    } catch (error) {
      console.error(error);
      toast.error('데이터 저장을 실패했어요.');
      setLoadingOpen(false);
    } finally {
      isSavingRef.current = false;
    }
  };

  const handleCheckboxChange = (key: keyof ShowCheckbox) => {
    const current = showCheckbox[key] ?? false;
    setField('showCheckbox', key, !current);
  };

  return (
    <Layout viewType="admin">
      <div css={adminLayoutStyle({ isMobile })}>
        {!isMobile && (
          <div css={previewAreaStyle}>
            <WeddingPreview shareId={uid ?? ''} />
          </div>
        )}
        <div css={adminPanelStyle({ isMobile })}>
          {isMobile && (
            <ButtonContentModal buttonText="미리보기" title="미리보기">
              <WeddingPreview isPopup shareId={uid ?? ''} />
            </ButtonContentModal>
          )}
          {adminList.length > 0 && (
            <Accordion>
              {adminList.map(({ title, value, component: Component }) => (
                <div key={value} css={divWrapStyle}>
                  <div css={checkboxStyle}>
                    <BaseCheckBoxInput
                      checked={showCheckbox[value] ?? false}
                      id={value}
                      onChange={() => handleCheckboxChange(value)}
                    />
                  </div>
                  <div css={accordionItemStyle}>
                    <AccordionItem title={title} value={value}>
                      <Component />
                    </AccordionItem>
                  </div>
                </div>
              ))}
            </Accordion>
          )}
          <button
            css={buttonStyle}
            disabled={isSavingRef.current}
            onClick={handleSave}
          >
            저장하기
          </button>
        </div>
      </div>

      <Toaster duration={2000} position="top-center" />
      <LoadingBackdrop open={loading} />
    </Layout>
  );
};

const adminLayoutStyle = ({ isMobile }: { isMobile: boolean }) => css`
  display: ${isMobile ? 'block' : 'flex'};
  ${!isMobile && 'justify-content: center;'}
  gap: 3rem;
  width: 100%;
`;

const adminPanelStyle = ({ isMobile }: { isMobile: boolean }) => css`
  flex: ${isMobile ? 'none' : '0 0 50%'};
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 430px;
  padding: ${isMobile ? 0 : '3rem 1.5rem'};
  ${!isMobile &&
  `
    height: 100vh;
    overflow-y: auto;
  `}
`;

const previewAreaStyle = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-width: 430px;
`;

const divWrapStyle = css`
  display: flex;
  gap: 8px;
`;

const checkboxStyle = css`
  flex-shrink: 0;
  margin-top: 1.1rem;
`;

const accordionItemStyle = css`
  flex: 1;
  min-width: 0;
`;

const buttonStyle = css`
  font-family: 'Wedding';
  padding: 0.9rem;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: var(--gray11);
  background-color: var(--gray2);
  border: 1px solid var(--gray4);
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease;

  &:hover {
    background-color: var(--gray8);
    color: var(--gray1);
    border-color: var(--gray8);
  }

  &:active {
    background-color: var(--gray11);
    color: var(--gray1);
    border-color: var(--gray11);
  }
`;

export default AdminPage;
