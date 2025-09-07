import { Navigate, useParams } from 'react-router-dom';

import AccountList from '@/components/account/AccountList';
import DateCalendar from '@/components/calendar/DateCalendar';
import Contact from '@/components/contact/Contact';
import Gallery from '@/components/gallery/Gallery';
import WeddingIntro from '@/components/Intro/WeddingIntro';
import WeddingMap from '@/components/map/WeddingMap';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import TransportList from '@/components/transport/TransportList';
import { useWeddingInfoByShareId } from '@/hooks/useWeddingInfoByShareId';
import { useWeddingStore } from '@/stores/useWeddingStore';

const SharePage = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);
  const { shareId } = useParams<{ shareId: string }>();
  const { notFound } = useWeddingInfoByShareId(shareId, setDeep);

  if (notFound) {
    return <Navigate replace to="/404" />;
  }

  return (
    <PageLayout>
      <Section>
        <WeddingIntro />
      </Section>
      <Section>
        <Contact />
      </Section>
      <Section>
        <DateCalendar />
      </Section>
      <Section>
        <AccountList />
      </Section>
      <Section>
        <WeddingMap />
      </Section>
      <Section>
        <TransportList />
      </Section>
      <Section>
        <Gallery />
      </Section>
    </PageLayout>
  );
};

export default SharePage;
