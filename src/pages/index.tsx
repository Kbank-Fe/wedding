import AccountList from '@/components/AccountList';
import DateCalendar from '@/components/calendar/DateCalendar';
import PageLayout from '@/components/PageLayout';
import TransferList from '@/components/transfer/TransferList';

const HomePage = () => {
  return (
    <PageLayout>
      <DateCalendar
        day={15}
        hour={21}
        min={30}
        month={7}
        msec={0}
        sec={0}
        year={2026}
      />
      <TransferList />
      <AccountList />
    </PageLayout>
  );
};
export default HomePage;
