import BaseTextEditor from '@/components/shared/BaseTextEditor';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';

const TransportAdmin = () => {
  const transportList = useWeddingStore(
    (state) => state.values.transport.transportList,
  );

  const setDeep = useWeddingStore((state) => state.setDeep);

  const handleChangeInput =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        draft.transport.transportList[index].title = event.currentTarget.value;
      });
    };

  const handleChangeEditor = (index: number) => (html: string) => {
    setDeep((draft) => {
      draft.transport.transportList[index].description = html;
    });
  };

  return (
    <>
      {transportList.map((item, index) => (
        <Field key={index} label={`교통수단${index + 1}`}>
          <BaseTextInput
            maxLength={24}
            placeholder="교통수단을 입력해주세요"
            value={item.title}
            onChange={handleChangeInput(index)}
          />
          <BaseTextEditor
            height={120}
            value={item.description}
            onChange={handleChangeEditor(index)}
          />
        </Field>
      ))}
    </>
  );
};

export default TransportAdmin;
