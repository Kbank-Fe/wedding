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
      {localThemeItem?.groomEnglishName && (
        <Field description="신랑 영문명" label="신랑 영문명" mode="single">
          <BaseTextInput
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
      {localThemeItem?.brideEnglishName && (
        <Field description="신부 영문명" label="신부 영문명" mode="single">
          <BaseTextInput
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
      {localThemeItem?.mainPhrase && (
        <Field description="메인 문구" label="메인 문구" mode="single">
          <BaseTextInput
            placeholder="메인 문구를 입력해주세요"
            value={theme.mainPhrase || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.mainPhrase = e.target.value;
              });
            }}
          />
        </Field>
      )}
      {localThemeItem?.subPhrase && (
        <Field description="서브 문구" label="서브 문구" mode="single">
          <BaseTextInput
            placeholder="서브 문구를 입력해주세요"
            value={theme.subPhrase || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.subPhrase = e.target.value;
              });
            }}
          />
        </Field>
      )}
      {localThemeItem?.word1 && (
        <Field description="첫번째 단어" label="첫번째 단어" mode="single">
          <BaseTextInput
            placeholder="첫번째 단어를 입력해주세요"
            value={theme.word1 || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.word1 = e.target.value;
              });
            }}
          />
        </Field>
      )}
      {localThemeItem?.word2 && (
        <Field description="두번째 단어" label="두번째 단어" mode="single">
          <BaseTextInput
            placeholder="두번째 단어를 입력해주세요"
            value={theme.word2 || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.word2 = e.target.value;
              });
            }}
          />
        </Field>
      )}
      {localThemeItem?.word3 && (
        <Field description="세번째 단어" label="세번째 단어" mode="single">
          <BaseTextInput
            placeholder="세번째 단어를 입력해주세요"
            value={theme.word3 || ''}
            onChange={(e) => {
              setDeep((draft) => {
                draft.theme.word3 = e.target.value;
              });
            }}
          />
        </Field>
      )}
    </>
  );
};

export default ThemeAdmin;
