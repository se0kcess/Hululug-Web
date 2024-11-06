import { ApiResponse, LoginResponse, LoginUrlResponse, User } from '@/types/auth';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // 프록시 사용
});

export const authApi = {
  getKakaoLoginUrl: async () => {
    const { data } = await axiosInstance.get<ApiResponse<LoginUrlResponse>>('/users/kakao/url');
    console.log(data);

    return data.data.login_url;
  },

  getKakaoSignUpUrl: async () => {
    // 카카오 로그인 URL을 직접 생성
    const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth/authorize';
    const CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_SIGNUP_REDIRECT_URI;
    const signUpUrl = `${KAKAO_AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

    return signUpUrl;
  },

  login: async (code: string): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>('/users/sessions', { code });
    return data;
  },

  signup: async (formData: FormData): Promise<ApiResponse<User>> => {
    const { data } = await axiosInstance.post<ApiResponse<User>>('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};
