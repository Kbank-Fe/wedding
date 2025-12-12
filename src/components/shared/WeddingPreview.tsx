import { css } from '@emotion/react';

import Footer from '@/components/footer/Footer';
import Layout from '@/components/shared/Layout';
import LoadingBackdrop from '@/components/shared/LoadingBackdrop';
import Section from '@/components/shared/Section';
import Theme from '@/components/theme/Theme';
import { PreviewModeProvider } from '@/contexts/PreviewModeContext';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { mainList } from '@/utils/mainList';

type WeddingPreviewProps = {
  shareId?: string;
  isPopup?: boolean;
  loading?: boolean;
};

const WeddingPreview = ({
  shareId = '',
  isPopup = false,
  loading = false,
}: WeddingPreviewProps) => {
  const activeCheckbox = useWeddingStore(
    (state) => state.values.activeCheckbox,
  );

  if (loading) {
    return (
      <>
        <LoadingBackdrop open={true} text="저희의 결혼식에 초대합니다" />
      </>
    );
  }

  return (
    <PreviewModeProvider isPopup={isPopup}>
      <Layout viewType="main">
        <div css={containerStyle({ isPopup })}>
          <div css={previewContentStyle({ isPopup })}>
            <Theme />
            {mainList.length > 0 && (
              <>
                {mainList.map(
                  ({ key, alwaysVisible, component: Component }) =>
                    (alwaysVisible || activeCheckbox[key]) && (
                      <Section key={key}>
                        <Component />
                      </Section>
                    ),
                )}
              </>
            )}
            <Footer shareId={shareId} />
          </div>
        </div>
      </Layout>
    </PreviewModeProvider>
  );
};

const containerStyle = ({ isPopup }: { isPopup: boolean }) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  ${isPopup &&
  `
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `}
`;

const previewContentStyle = ({ isPopup }: { isPopup: boolean }) => css`
  width: 100%;
  ${!isPopup &&
  `
    height: 100vh;
    border-left: 1px solid var(--gray3);
    border-right: 1px solid var(--gray3);
  `}
`;

export default WeddingPreview;
