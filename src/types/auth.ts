export interface KakaoAuthResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
}

export interface User {
  id: number;
  nickname: string;
  profileImage: string;
  email?: string;
}
