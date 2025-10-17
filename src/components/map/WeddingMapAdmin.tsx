import { type ChangeEvent } from 'react';

import AddressSearch from '@/components/map/AddressSearch';
import BaseCheckBoxInput from '@/components/shared/BaseCheckBoxInput';
import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { isValid } from '@/utils/validate';

type TextField = 'venueName' | 'venueDetail';

const WeddingMapAdmin = () => {
  const setField = useWeddingStore((state) => state.setField);
  const map = useWeddingStore((state) => state.values.map);

  const handleChangeText =
    (field: TextField) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      if (!isValid(value, 'txt')) {
        e.preventDefault();
        return;
      }
      setField('map', field, value);
    };

  const handleSelectAddress = (address: string) => {
    setField('map', 'address', address);
  };

  const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setField('map', 'isMapVisible', e.currentTarget.checked);
  };

  return (
    <>
      <Field label="예식장명">
        <BaseTextInput
          maxLength={20}
          value={map.venueName ?? ''}
          onChange={handleChangeText('venueName')}
        />
      </Field>

      <Field label="층과 홀">
        <BaseTextInput
          maxLength={20}
          value={map.venueDetail ?? ''}
          onChange={handleChangeText('venueDetail')}
        />
      </Field>

      <Field label="주소" mode="group">
        <BaseTextInput readOnly value={map.address ?? ''} />
        <AddressSearch buttonText="검색" onSelect={handleSelectAddress} />
      </Field>

      <Field label="지도 표시" mode="group">
        <BaseCheckBoxInput
          checkboxLabel=""
          checked={map.isMapVisible ?? false}
          onChange={handleChangeCheckbox}
        />
      </Field>
    </>
  );
};

export default WeddingMapAdmin;
