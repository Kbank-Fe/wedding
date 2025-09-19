import { css } from '@emotion/react';
import { Navigate, useNavigate } from 'react-router';
import { toast, Toaster } from 'sonner';

import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWeddingInfoByUid } from '@/hooks/useWeddingInfoByUid';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { SavedImage } from '@/types/wedding';
import { adminList } from '@/utils/adminList';
import { saveUserShare } from '@/utils/shares';
import { uploadImageAndSaveMetaRTDB } from '@/utils/storage';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, uid, isLoading } = useCurrentUser();
  const { localImageList } = useWeddingStore((state) => state.values.gallery);

  const values = useWeddingStore((state) => state.values);
  const setDeep = useWeddingStore((state) => state.setDeep);
  const { notFound } = useWeddingInfoByUid(uid, setDeep);

  if (notFound) {
    return <Navigate replace to="/404" />;
  }

  const handleSetImageList = async () => {
    if (!uid) return;

    const metas: SavedImage[] = await Promise.all(
      localImageList.map((f) => uploadImageAndSaveMetaRTDB(uid, f, 'gallery')),
    ).then((res) => res.map((m) => ({ url: m.url, name: m.name })));
    setDeep((draft) => {
      draft.gallery.savedImageList.push(...metas);
      draft.gallery.localImageList = [];
    });
  };

  const handleSave = async () => {
    if (!user) return;
    try {
      await handleSetImageList();
      const shareId = await saveUserShare(uid!, values);
      toast.success('데이터를 저장했어요!');

      setTimeout(() => {
        navigate(`/${shareId}`);
      }, 2000);
    } catch {
      toast.error('데이터 저장을 실패했어요.');
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <PageLayout>
      <Section>
        {adminList.length > 0 && (
          <Accordion>
            {adminList.map(({ title, value, component: Component }) => (
              <AccordionItem key={value} title={title} value={value}>
                <Component />
              </AccordionItem>
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
export default AdminPage;
