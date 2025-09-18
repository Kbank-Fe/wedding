import KakaoLogin from '@/components/login/KakaoLoginButton';
import PageLayout from '@/components/shared/PageLayout';
import Section from '@/components/shared/Section';

const HomePage = () => {
  return (
    <PageLayout>
      <Section>
        <KakaoLogin />
      </Section>
    </PageLayout>
  );
};
export default HomePage;
