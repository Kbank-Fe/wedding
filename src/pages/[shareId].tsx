import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import Layout from '@/components/shared/Layout';
import WeddingPreview from '@/components/shared/WeddingPreview';
import { useWeddingInfo } from '@/hooks/useWeddingInfo';
import { useWeddingStore } from '@/stores/useWeddingStore';

const SharePage = () => {
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
    <Layout viewType="main">
      <WeddingPreview shareId={shareId ?? ''} />
    </Layout>
  );
};

export default SharePage;
