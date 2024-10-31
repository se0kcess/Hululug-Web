import { KakaoAuthResponse } from '@/types/auth';
import axios from 'axios';

const KAKAO_TOKEN_URL = 'https://kauth.kakao.com/oauth/token';
const KAKAO_USER_INFO_URL = 'https://kapi.kakao.com/v2/user/me';
const REST_API_KEY = import.meta.env.VITE_KAKAO_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export const authApi = {
  getKakaoToken: async (code: string): Promise<KakaoAuthResponse> => {
    const data = {
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    };

    const queryString = new URLSearchParams(data).toString();
    const response = await axios.post(
      `${KAKAO_TOKEN_URL}?${queryString}`,
      {},
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    return response.data;
  },

  getKakaoUserInfo: async (accessToken: string) => {
    const response = await axios.get(KAKAO_USER_INFO_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  },
};
