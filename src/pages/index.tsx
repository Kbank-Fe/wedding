import AccountList from '@/components/account/AccountList';
import DateCalendar from '@/components/calendar/DateCalendar';
import Contact from '@/components/contact/Contact';
import Gallery from '@/components/gallery/Gallery';
import WeddingIntro from '@/components/Intro/WeddingIntro';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import TransferList from '@/components/transfer/TransferList';

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
        <DateCalendar
          day={15}
          hour={21}
          min={30}
          month={7}
          msec={0}
          sec={0}
          year={2026}
        />
      </Section>
      <Section>
        <AccountList />
      </Section>
      <Section>
        <TransferList />
      </Section>
      <Section>
        <Gallery />
      </Section>
    </PageLayout>
  );
};
export default HomePage;
