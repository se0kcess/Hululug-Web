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
          navigate('/signup', { state: { code } });
        } else {
          navigate('/main');
        }
      },
      onError: (error) => {
        console.error('Login error:', error);

        // 404 에러인 경우 (사용자가 존재하지 않는 경우) 회원가입 페이지로 이동
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate('/signup', {
            state: {
              code,
              message: '회원가입이 필요합니다.',
            },
          });
        } else {
          // 다른 에러의 경우 로그인 페이지로 이동
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
