import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { LocalImage, WeddingInfoKeys } from '@/types/wedding';

export const useLocalImagePreviewList = (weddingInfoKey: WeddingInfoKeys) => {
  const { localImageList = [] } = useWeddingStore(
    (state) => state.values[weddingInfoKey] as { localImageList: LocalImage[] },
  );
  return useImagePreview(localImageList);
};
