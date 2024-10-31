import styled from '@emotion/styled';
import ramenImage from '@/assets/images/ramen-main.png';
import kakaoLoginButton from '@/assets/images/kakao_login_large_wide.png';
import LogoSmall from '@/assets/logos/LogoSmall';
import { Title1 } from '@/styles/Typography';

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

const KakaoButtonImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
`;

export default function IntroPage() {
  const handleKakaoLogin = () => {
    // 카카오 로그인 구현 예정
    console.log('카카오 로그인 시도');
  };

  return (
    <Container>
      <LogoContainer>
        <LogoSmall />
      </LogoContainer>
      <RamenImage src={ramenImage} alt="라면 이미지" />
      <Title>{`나만의 라면 레시피를\n공유하세요!`}</Title>
      <KakaoButton onClick={handleKakaoLogin}>
        <KakaoButtonImage src={kakaoLoginButton} alt="카카오 로그인" />
      </KakaoButton>
    </Container>
  );
}
