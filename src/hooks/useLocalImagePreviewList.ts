import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { ImageAllowedKeys, LocalImage, ThemeType } from '@/types/wedding';
import { themeList } from '@/utils/themeList';

export const useLocalImagePreviewList = (
  weddingInfoKey: ImageAllowedKeys,
  themeType: ThemeType,
) => {
  const { localImageList = [] } = useWeddingStore(
    (state) => state.values[weddingInfoKey] as { localImageList: LocalImage[] },
  );

  const imagePreviewList = useImagePreview(localImageList);

  const localThemeItem = themeList.find((item) => item.type === themeType);
  const defaultImages = localThemeItem?.image.defaultImageList ?? [];

  if (imagePreviewList && imagePreviewList.length > 0) {
    return imagePreviewList;
  }

  return defaultImages;
};
