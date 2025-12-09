export const FOLDER_CONFIG = {
  gallery: { multiple: true },
  share: { multiple: false },
} as const;

export type Folder = keyof typeof FOLDER_CONFIG;

export const FOLDERS = Object.keys(FOLDER_CONFIG) as Folder[];
