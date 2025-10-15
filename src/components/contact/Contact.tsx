import ContactModal from '@/components/contact/ContactModal';
import ContentModal from '@/components/shared/ContentModal';

const Contact = () => {
  return (
    <ContentModal
      buttonText="연락 하기"
      description="연락하기 모달창입니다"
      title="연락 하기"
    >
      <ContactModal />
    </ContentModal>
  );
};

export default Contact;
