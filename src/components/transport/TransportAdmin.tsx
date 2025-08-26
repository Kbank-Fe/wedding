import { useMemo } from 'react';

import BaseTextInput from '@/components/shared/BaseTextInput';
import Input from '@/components/shared/Input';
import { useWeddingStore } from '@/stores/useWeddingStore';

const TransportAdmin = () => {
  const transportList = useWeddingStore(
    (state) => state.values.transport.transportList,
  );
  const titleList = useMemo(
    () => transportList.map((item) => item.title),
    [transportList],
  );

  const setDeep = useWeddingStore((state) => state.setDeep);

  const handleChangeInput =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDeep((draft) => {
        draft.transport.transportList[index].title = event.currentTarget.value;
      });
    };

  return (
    <>
      {titleList.map((title, index) => (
        <Input key={index} labelText={`교통수단${index + 1}`}>
          <BaseTextInput
            placeholder="교통수단 (지하철, 버스, 자가용 등)"
            value={title}
            onChange={handleChangeInput(index)}
          />
        </Input>
      ))}
    </>
  );
};

export default TransportAdmin;
