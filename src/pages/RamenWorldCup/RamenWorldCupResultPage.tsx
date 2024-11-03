import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { useRamenStore } from '@/store/ramenStore';
import { RAMEN_IMAGES } from '@/constants/ramenWorldCupList';
import { ButtonText, ChipText, DisplayText, Title1 } from '@/styles/Typography';
import BackButton from '@/components/common/BackButton/BackButton';

const Container = styled.div`
  margin: 0 auto;
  padding: 1rem;
  background-color: ${theme.colors.white};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const ResultText = styled(Title1)`
  margin-bottom: 2rem;
  text-align: center;
`;

const WinnerName = styled(DisplayText)`
  color: ${theme.colors.primaryMain};
  margin-bottom: 2.5rem;
`;

const RamenImageContainer = styled.div`
  width: 240px;
  height: 240px;
  margin-bottom: 2.5rem;
`;

const RamenImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const RankingLink = styled(ChipText)`
  color: ${theme.colors.gray[500]};
  text-decoration: underline;
  margin-bottom: 2.5rem;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding: 0 1.5rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled(ButtonText)<{ variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  ${({ variant }) =>
    variant === 'secondary'
      ? `
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primaryMain};
    color: ${theme.colors.primaryMain};
    
    &:hover {
      background-color: ${theme.colors.primaryPastel};
    }
  `
      : `
    background-color: ${theme.colors.primaryMain};
    border: none;
    color: ${theme.colors.white};
    
    &:hover {
      background-color: ${theme.colors.primaryDark};
    }
  `}
`;

export default function RamenWorldCupResultPage() {
  const navigate = useNavigate();
  const { winner, shuffleRamenList } = useRamenStore();

  if (!winner) {
    navigate('/');
    return null;
  }

  const handleRestart = () => {
    shuffleRamenList();
    navigate('/ramenworldcup');
  };

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <ContentContainer>
        <ResultText>나의 최애 라면은</ResultText>

        <WinnerName>{winner.name}</WinnerName>

        <RamenImageContainer>
          <RamenImage src={RAMEN_IMAGES[winner.imageKey]} alt={winner.name} />
        </RamenImageContainer>

        <RankingLink onClick={() => navigate('/ramenworldcup/rank')}>
          전체 라면 순위 보러가기
        </RankingLink>

        <ButtonContainer>
          <Button onClick={handleRestart}>
            <ButtonText>테스트 다시하기</ButtonText>
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              // 공유 기능 구현
              if (navigator.share) {
                navigator.share({
                  title: '라면 이상형 월드컵',
                  text: `나의 최애 라면은 ${winner.name}입니다!`,
                  url: window.location.href,
                });
              } else {
                // 클립보드 복사 등 대체 공유 방법 구현
                navigator.clipboard.writeText(window.location.href);
                alert('링크가 복사되었습니다!');
              }
            }}
          >
            <ButtonText>테스트 공유하기</ButtonText>
          </Button>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
}
