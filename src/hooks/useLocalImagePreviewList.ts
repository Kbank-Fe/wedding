import { useImagePreview } from '@/hooks/useImagePreview';
import { useWeddingStore } from '@/stores/useWeddingStore';

export const useLocalImagePreviewList = () => {
  const { localImageList } = useWeddingStore(
    (state) => state.values.themeImage,
  );
  return useImagePreview(localImageList);
};
