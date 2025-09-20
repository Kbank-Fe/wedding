import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { ShowCheckbox, WeddingInfo } from '@/types/wedding';
import { mainList } from '@/utils/mainList';
import { getShare } from '@/utils/shares';

import { isValidNanoId } from '../utils/validateNanoId';

const SharePage = () => {
  const showCheckbox = useWeddingStore((state) => state.values.showCheckbox);
  console.log('showCheckbox : ' + JSON.stringify(showCheckbox));
  const setDeep = useWeddingStore((state) => state.setDeep);
  const { shareId } = useParams<{ shareId: string }>();

  useEffect(() => {
    if (!shareId || !isValidNanoId(shareId)) return;

    (async () => {
      try {
        const doc = await getShare<WeddingInfo>(shareId);
        if (doc?.data) {
          setDeep((draft) => {
            Object.assign(draft, doc.data);
          });
        }
      } catch (err) {
        console.error('데이터 불러오기 실패:', err);
      }
    })();
  }, [shareId, setDeep]);

  if (!shareId) return null;
  if (!isValidNanoId(shareId)) return <Navigate replace to="/404" />;

  return (
    <PageLayout>
      {mainList.length > 0 && (
        <div>
          {mainList.map(
            ({ key, alwaysVisible, component: Component }) =>
              (alwaysVisible || showCheckbox[key as keyof ShowCheckbox]) && (
                <Section key={key}>
                  <Component />
                </Section>
              ),
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default SharePage;
