import BaseTextInput from '@/components/shared/BaseTextInput';
import Field from '@/components/shared/Field';
import { useWeddingStore } from '@/stores/useWeddingStore';
import { themeList } from '@/utils/themeList';

const ThemeAdmin = () => {
  const setDeep = useWeddingStore((state) => state.setDeep);

  const theme = useWeddingStore((state) => state.values.theme) || {};

  const localThemeItem = themeList.find((item) => item.type === theme.type);

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedType = e.target.value;
    setDeep((draft) => {
      draft.theme.type = selectedType as typeof theme.type;
    });
  };

  return (
    <>
      <label>
        <input
          checked={theme.type === 'CARDSLIDE'}
          name="themeRadio"
          type="radio"
          value="CARDSLIDE"
          onChange={handleChangeRadio}
        />
        CARDSLIDE
      </label>
      <br />
      <label>
        <input
          checked={theme.type === 'FULL'}
          name="themeRadio"
          type="radio"
          value="FULL"
          onChange={handleChangeRadio}
        />
        FULL
      </label>
      <br />
      <label>
        <input
          checked={theme.type === 'MONOCHROME'}
          name="themeRadio"
          type="radio"
          value="MONOCHROME"
          onChange={handleChangeRadio}
        />
        MONOCHROME
      </label>
      <br />
      <label>
        <input
          checked={theme.type === 'POLAROID'}
          name="themeRadio"
          type="radio"
          value="POLAROID"
          onChange={handleChangeRadio}
        />
        POLAROID
      </label>
      <br />
      <label>
        <input
          checked={theme.type === 'ROUNDSLIDE'}
          name="themeRadio"
          type="radio"
          value="ROUNDSLIDE"
          onChange={handleChangeRadio}
        />
        ROUNDSLIDE
      </label>
      {localThemeItem?.groomEnglishName?.isShow && (
        <Field description="신랑 영문명" label="신랑 영문명" mode="single">
          <BaseTextInput
            maxLength={localThemeItem?.groomEnglishName?.maxLength}
            placeholder="신랑 영문명을 입력해주세요"
            value={theme['groomEnglishName'] || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.groomEnglishName = e.target.value;
              });
            }}
          />
        </Field>
      )}
      {localThemeItem?.brideEnglishName?.isShow && (
        <Field description="신부 영문명" label="신부 영문명" mode="single">
          <BaseTextInput
            maxLength={localThemeItem?.brideEnglishName?.maxLength}
            placeholder="신부 영문명을 입력해주세요"
            value={theme.brideEnglishName || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.brideEnglishName = e.target.value;
              });
            }}
          />
        </Field>
      )}
      {localThemeItem?.text1?.isShow && (
        <Field description="첫번째 문구" label="첫번째 문구" mode="single">
          <BaseTextInput
            maxLength={localThemeItem?.text1?.maxLength}
            placeholder="첫번째 문구를 입력해주세요"
            value={theme.text1 || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.text1 = e.target.value;
              });
            }}
          />
        </Field>
      )}
      {localThemeItem?.text2?.isShow && (
        <Field description="두번째 문구" label="두번째 문구" mode="single">
          <BaseTextInput
            maxLength={localThemeItem?.text2?.maxLength}
            placeholder="두번째 문구를 입력해주세요"
            value={theme.text2 || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.text2 = e.target.value;
              });
            }}
          />
        </Field>
      )}
      {localThemeItem?.text3?.isShow && (
        <Field description="세번째 문구" label="세번째 문구" mode="single">
          <BaseTextInput
            maxLength={localThemeItem?.text3?.maxLength}
            placeholder="세번째 문구를 입력해주세요"
            value={theme.text3 || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.text3 = e.target.value;
              });
            }}
          />
        </Field>
      )}
    </>
  );
};

export default ThemeAdmin;
