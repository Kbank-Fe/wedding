import AccountList from '@/components/account/AccountList';
import DateCalendar from '@/components/calendar/DateCalendar';
import Contact from '@/components/contact/Contact';
import Gallery from '@/components/gallery/Gallery';
import WeddingIntro from '@/components/Intro/WeddingIntro';
import WeddingMap from '@/components/map/WeddingMap';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import TransportList from '@/components/transport/TransportList';

const HomePage = () => {
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
export default HomePage;
