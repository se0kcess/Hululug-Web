import styled from '@emotion/styled';
import ramenImage from '@/assets/images/ramen-main.png';
import kakaoLoginButton from '@/assets/images/kakao_login_large_wide.png';
import LogoSmall from '@/assets/logos/LogoSmall';
import { Title1 } from '@/styles/Typography';
import { useKakaoLoginUrl } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner';

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  margin-top: 20vh;
  margin-bottom: 2rem;
`;

const RamenImage = styled.img`
  width: 200px;
  height: auto;
  margin-bottom: 3rem;
`;

const Title = styled(Title1)`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const KakaoButton = styled.button`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  &:active {
    opacity: 0.8;
  }
`;

const LoadingSpinnerContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KakaoButtonImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
`;

export default function LoginPage() {
  const { data: loginUrl, isPending, error } = useKakaoLoginUrl();

  const handleKakaoLogin = () => {
    if (loginUrl) {
      console.log('Login URL:', loginUrl);
      window.location.href = loginUrl;
    }
  };

  if (isPending) {
    return (
      <LoadingSpinnerContainer>
        <LoadingSpinner />
      </LoadingSpinnerContainer>
    );
  }

  // 에러 상태 표시
  if (error) {
    console.error('Error fetching login URL:', error);
    return <div>에러가 발생했습니다</div>;
  }

  return (
    <Container>
      <LogoContainer>
        <LogoSmall width={120} />
      </LogoContainer>
      <RamenImage src={ramenImage} alt="라면 이미지" />
      <Title>{`나만의 라면 레시피를\n공유하세요!`}</Title>
      <KakaoButton onClick={handleKakaoLogin} disabled={isPending}>
        <KakaoButtonImage src={kakaoLoginButton} alt="카카오 로그인" />
      </KakaoButton>
    </Container>
  );
}
