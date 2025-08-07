import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import PageLayout from '@/components/shared/PageLayout';
import TransportAdmin from '@/components/transport/TransportAdmin';

const AdminPage = () => {
  return (
    <PageLayout>
      <Accordion>
        <AccordionItem title="교통수단" value="transp">
          <TransportAdmin />
        </AccordionItem>
      </Accordion>
    </PageLayout>
  );
};

export default AdminPage;
