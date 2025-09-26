import { Navigate, useParams } from 'react-router-dom';

import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import { useWeddingInfoByShareId } from '@/hooks/useWeddingInfoByShareId';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { WeddingInfo } from '@/types/wedding';
import { mainList } from '@/utils/mainList';

const SharePage = () => {
  const showCheckbox = useWeddingStore((state) => state.values.showCheckbox);
  const setDeep = useWeddingStore((state) => state.setDeep);
  const { shareId } = useParams<{ shareId: string }>();
  const { notFound } = useWeddingInfoByShareId(shareId, setDeep);

  if (notFound) {
    return <Navigate replace to="/404" />;
  }

  return (
    <PageLayout>
      {mainList.length > 0 && (
        <>
          {mainList.map(
            ({ key, alwaysVisible, component: Component }) =>
              (alwaysVisible || showCheckbox[key]) && (
                <Section key={key}>
                  <Component />
                </Section>
              ),
          )}
        </>
      )}
    </PageLayout>
  );
};

export default SharePage;
