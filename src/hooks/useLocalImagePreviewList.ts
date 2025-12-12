import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';
import type { ImageAllowedKeys, LocalImage } from '@/types/wedding';

export const useLocalImagePreviewList = (weddingInfoKey: ImageAllowedKeys) => {
  const { localImageList = [] } = useWeddingStore(
    (state) => state.values[weddingInfoKey] as { localImageList: LocalImage[] },
  );
  return useImagePreview(localImageList);
};
