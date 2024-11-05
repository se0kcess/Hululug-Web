import { ApiResponse, LoginResponse, LoginUrlResponse, User } from '@/types/auth';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // 프록시 사용
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  getKakaoLoginUrl: async () => {
    const { data } = await axiosInstance.get<ApiResponse<LoginUrlResponse>>('/users/kakao/url');
    console.log(data);

    return data.data.login_url;
  },

  login: async (code: string): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>('/users/sessions', { code });
    return data;
  },

  signup: async (userData: {
    nickname: string;
    introduce: string;
    profile_image: string;
    code: string;
  }): Promise<ApiResponse<User>> => {
    const { data } = await axiosInstance.post<ApiResponse<User>>('/users', userData);
    return data;
  },
};
