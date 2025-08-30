import { Link } from 'react-router-dom';

import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import { adminList } from '@/utils/adminList';

const AdminPage = () => {
  return (
    <PageLayout>
      <Section>
        {adminList.length > 0 && (
          <Accordion>
            {adminList.map(({ title, value, component: Component }) => (
              <AccordionItem key={value} title={title} value={value}>
                <Component />
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Section>
      {/* TODO: 임시 미리보기 라우터 제거 */}
      <Section>
        <Link to="/">미리보기</Link>
      </Section>
    </PageLayout>
  );
};

export default AdminPage;
