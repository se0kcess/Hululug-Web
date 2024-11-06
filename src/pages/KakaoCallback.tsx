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

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate(`/signup?code=${code}`, {
            state: {
              code,
              message: '회원가입이 필요합니다.',
            },
          });
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
