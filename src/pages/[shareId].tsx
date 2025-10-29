import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Footer from '@/components/footer/Footer';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import { useWeddingInfo } from '@/hooks/useWeddingInfo';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { mainList } from '@/utils/mainList';

const SharePage = () => {
  const showCheckbox = useWeddingStore((state) => state.values.showCheckbox);
  const setDeep = useWeddingStore((state) => state.setDeep);
  const { shareId } = useParams<{ shareId: string }>();
  const { notFound } = useWeddingInfo({ shareId }, setDeep);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (notFound) {
    return <Navigate replace to="/404" />;
  }

  return (
    <PageLayout isPadded={false} pageType="main">
      {mainList.length > 0 && (
        <>
          {mainList.map(
            ({ key, alwaysVisible, component: Component, isPadded }) =>
              (alwaysVisible || showCheckbox[key]) && (
                <Section key={key} isPadded={isPadded}>
                  <Component />
                </Section>
              ),
          )}
        </>
      )}
      <Footer shareId={shareId ?? ''} />
    </PageLayout>
  );
};

export default SharePage;
