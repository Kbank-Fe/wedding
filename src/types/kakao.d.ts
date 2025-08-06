interface Window {
  Kakao: {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Auth: {
      login: (options: {
        scope: string;
        success: (authObj: unknown) => void;
        fail: (err: unknown) => void;
      }) => void;
      logout: (callback?: () => void) => void;
    };
    API: {
      request: (options: {
        url: string;
        success: (res: unknown) => void;
        fail: (err: unknown) => void;
      }) => void;
    };
  };
}
