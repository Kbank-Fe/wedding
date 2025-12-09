import type { WeddingInfo } from '@/types/wedding';

export const FOLDER_CONFIG = {
  gallery: { multiple: true },
  share: { multiple: false },
} as const;
export const FOLDERS = Object.keys(FOLDER_CONFIG) as Folder[];

export type Folder = keyof typeof FOLDER_CONFIG;
export type WeddingFolderSections = {
  [F in Folder]: WeddingInfo[F];
};
export type FolderSection<F extends Folder> = WeddingFolderSections[F];
