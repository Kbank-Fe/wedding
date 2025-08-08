export interface KakaoAuthResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

export interface KakaoUserProfile {
  id: number;
  connected_at?: string;
  kakao_account?: {
    profile?: {
      nickname?: string;
      profile_image_url?: string;
      thumbnail_image_url?: string;
    };
    email?: string;
  };
}
