import type { KakaoAuthResponse, KakaoUserProfile } from './kakao';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Auth: {
        login: (options: {
          scope: string;
          success: (authObj: KakaoAuthResponse) => void;
          fail: (err: Error) => void;
        }) => void;
        logout: (callback?: () => void) => void;
      };
      API: {
        request: (options: {
          url: string;
          success: (res: KakaoUserProfile) => void;
          fail: (err: Error) => void;
        }) => void;
      };
    };
  }
}

export {};
