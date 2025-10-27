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

  if (notFound) {
    return <Navigate replace to="/404" />;
  }

  return (
    <PageLayout pageType="main">
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
      <Footer shareId={shareId ?? ''} />
    </PageLayout>
  );
};

export default SharePage;
