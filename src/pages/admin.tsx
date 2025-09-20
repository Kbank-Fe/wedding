import { css } from '@emotion/react';
import { useNavigate } from 'react-router';
import { toast, Toaster } from 'sonner';

import { Accordion } from '@/components/account/Accordion';
import { AccordionItem } from '@/components/account/AccordionItem';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import useWeddingInfo from '@/hooks/useWeddingInfo';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { ShowCheckbox } from '@/types/wedding';
import { adminList } from '@/utils/adminList';
import { getUserShareId, saveUserShare } from '@/utils/shares';

const AdminPage = () => {
  const navigate = useNavigate();
  const { user, uid, isLoading } = useCurrentUser();

  const values = useWeddingStore((state) => state.values);
  const showCheckbox = values.showCheckbox;

  const setDeep = useWeddingStore((state) => state.setDeep);
  const setField = useWeddingStore((state) => state.setField);

  useWeddingInfo(uid, setDeep);

  const handleSave = async () => {
    if (!user) return;
    try {
      await saveUserShare(uid!, values);
      toast.success('데이터를 저장했어요!');

      const id = await getUserShareId(uid ?? '');
      setTimeout(() => {
        navigate(`/${id}`);
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error('데이터 저장을 실패했어요.');
    }
  };

  const handleCheckboxChange = (key: string) => {
    const current = showCheckbox[key as keyof ShowCheckbox] ?? false;
    setField('showCheckbox', key as keyof ShowCheckbox, !current);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <PageLayout>
      <Section>
        {adminList.length > 0 && (
          <Accordion>
            {adminList.map(({ title, value, component: Component }) => (
              <div key={value} css={divWrapStyle}>
                <input
                  checked={showCheckbox[value as keyof ShowCheckbox] ?? false}
                  css={checkboxStyle}
                  type="checkbox"
                  onChange={() => handleCheckboxChange(value)}
                />
                <div css={accordionItemStyle}>
                  <AccordionItem title={title} value={value}>
                    <Component />
                  </AccordionItem>
                </div>
              </div>
            ))}
          </Accordion>
        )}
        <button css={buttonStyle} onClick={handleSave}>
          데이터 저장
        </button>
      </Section>
      <Toaster duration={2000} position="top-center" />
    </PageLayout>
  );
};

const buttonStyle = css`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid var(--gray3);
  background: var(--gray2);
  color: var(--gray12);
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: var(--gray3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const divWrapStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const checkboxStyle = css`
  flex-shrink: 0;
  margin-top: 1.2rem;
`;

const accordionItemStyle = css`
  flex: 1;
`;

export default AdminPage;
