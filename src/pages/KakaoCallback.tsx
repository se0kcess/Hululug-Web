import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLogin } from '@/hooks/useAuth';
import axios from 'axios';
import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner';
import styled from '@emotion/styled';

const LoadingSpinnerContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
      onSuccess: (response) => {
        if (response.data) {
          navigate('/');
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          const email = error.response.data.message.split(' : ')[1]?.trim();
          navigate(`/signup?code=${code}`, {
            state: {
              code,
              email,
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
    return (
      <LoadingSpinnerContainer>
        <LoadingSpinner />
      </LoadingSpinnerContainer>
    );
  }

  return null;
}
