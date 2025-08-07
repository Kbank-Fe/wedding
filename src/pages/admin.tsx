import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import PageLayout from '@/components/shared/PageLayout';
import { adminList } from '@/utils/adminList';

const AdminPage = () => {
  return (
    <PageLayout>
      {adminList.length > 0 && (
        <Accordion>
          {adminList.map(({ title, value, component: Component }) => (
            <AccordionItem key={value} title={title} value={value}>
              <Component />
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </PageLayout>
  );
};

export default AdminPage;
