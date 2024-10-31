import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useKakaoLogin } from '@/hooks/useAuth';

export default function KakaoCallback() {
  const [searchParams] = useSearchParams();
  const kakaoLogin = useKakaoLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      // 에러 처리 (추후)
      return;
    }
    kakaoLogin.mutate(code);
  }, [searchParams, kakaoLogin]);

  if (kakaoLogin.isPending) {
    return <div>로그인 처리중...</div>;
  }

  if (kakaoLogin.isError) {
    return <div>로그인 실패</div>;
  }

  return null;
}
