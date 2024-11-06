import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';
import { LoginResponse } from '@/types/auth';
import axios from 'axios';

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      navigate('/login');
      return;
    }

    login(code, {
      onSuccess: (response: LoginResponse) => {
        if (!response.data) {
          navigate(`/signup?code=${code}`);
        } else {
          navigate('/main');
        }
      },
      onError: (error) => {
        console.error('Login error:', error);

        // 404 에러인 경우 (사용자가 존재하지 않는 경우) 회원가입 페이지로 이동
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          // 회원이 아닌 경우 회원가입용 카카오 로그인으로 리다이렉트
          const kakaoSignupURL = `https://kauth.kakao.com/oauth/authorize?client_id=${
            import.meta.env.VITE_KAKAO_CLIENT_ID
          }&redirect_uri=${import.meta.env.VITE_SIGNUP_REDIRECT_URI}&response_type=code`;

          window.location.href = kakaoSignupURL;
        } else {
          navigate('/login');
        }
      },
    });
  }, [searchParams, login, navigate]);

  if (isPending) {
    return <div>로그인 처리중...</div>;
  }

  return null;
}
