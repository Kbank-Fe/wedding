import AccountList from '@/components/AccountList';
import PageLayout from '@/components/PageLayout';
import TransferList from '@/components/transfer/TransferList';

const HomePage = () => {
  return (
    <PageLayout>
      <TransferList />
      <AccountList />
    </PageLayout>
  );
};
export default HomePage;
