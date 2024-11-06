import { authApi } from '@/api/authAPI';
import { useAuthStore } from '@/store/authStore';
import { LoginResponse } from '@/types/auth';
import { useMutation, useQuery } from '@tanstack/react-query';

// 카카오 로그인 URL 가져오기
export const useKakaoLoginUrl = () => {
  return useQuery({
    queryKey: ['auth', 'kakao', 'loginUrl'],
    queryFn: () => authApi.getKakaoLoginUrl(),
    staleTime: Infinity,
  });
};

// 로그인 처리
export const useLogin = () => {
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response: LoginResponse) => {
      // 회원 정보가 있을 때만 상태 저장
      if (response.data) {
        setUser(response.data);
      }
    },
  });
};
