import AccountList from '@/components/AccountList';
import DateCalendar from '@/components/calendar/DateCalendar';
import PageLayout from '@/components/PageLayout';
import TransferList from '@/components/transfer/TransferList';
import WeddingIntro from '@/components/WeddingIntro';

const HomePage = () => {
  return (
    <PageLayout>
      <WeddingIntro />
      <DateCalendar
        day={15}
        hour={21}
        min={30}
        month={7}
        msec={0}
        sec={0}
        year={2025}
      />
      <TransferList />
      <AccountList />
    </PageLayout>
  );
};
export default HomePage;
