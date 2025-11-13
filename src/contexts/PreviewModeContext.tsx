import { createContext, useContext } from 'react';

const PreviewModeContext = createContext(false);
export const usePreviewMode = () => useContext(PreviewModeContext);

export const PreviewModeProvider = ({
  isPopup,
  children,
}: {
  isPopup: boolean;
  children: React.ReactNode;
}) => (
  <PreviewModeContext.Provider value={isPopup}>
    {children}
  </PreviewModeContext.Provider>
);
