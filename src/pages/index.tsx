import { Toaster } from 'sonner';

import AccountList from '@/components/account/AccountList';
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
        year={2026}
      />
      <TransferList />
      <AccountList />
      <Toaster duration={2000} position="top-center" />
    </PageLayout>
  );
};
export default HomePage;
