import { authApi } from '@/api/authAPI';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuthStore();

  // 카카오 토큰 받기 mutation
  const getKakaoTokenMutation = useMutation({
    mutationFn: authApi.getKakaoToken,
    onSuccess: async (data) => {
      setAccessToken(data.access_token);
      // 토큰으로 사용자 정보 요청
      const userInfo = await authApi.getKakaoUserInfo(data.access_token);

      const user = {
        id: userInfo.id,
        nickname: userInfo.properties.nickname,
        profileImage: userInfo.properties.profile_image,
        email: userInfo.kakao_account.email,
      };

      setUser(user);
      navigate('/main');
    },
    onError: (error) => {
      console.error('카카오 로그인 실패:', error);
      navigate('/login');
    },
  });

  return getKakaoTokenMutation;
};

// 카카오 로그인 URL 생성 hook
export const useKakaoLoginUrl = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  return kakaoURL;
};
