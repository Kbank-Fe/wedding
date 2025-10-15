import ContactModal from '@/components/contact/ContactModal';
import ButtonContentModal from '@/components/shared/ButtonContentModal';

const Contact = () => {
  return (
    <ButtonContentModal
      buttonText="연락 하기"
      description="연락하기 모달창입니다"
      title="연락 하기"
    >
      <ContactModal />
    </ButtonContentModal>
  );
};

export default Contact;
