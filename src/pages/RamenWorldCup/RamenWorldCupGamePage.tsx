import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { useRamenStore } from '@/store/ramenStore';
import { ButtonText, ChipText, Title1 } from '@/styles/Typography';
import { RAMEN_IMAGES } from '@/constants/ramenWorldCupList';
import BackButton from '@/components/common/BackButton/BackButton';

const Container = styled.div`
  margin: 0 auto;
  padding: 1rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Tag = styled(ButtonText)<{ round: number }>`
  display: inline-block;
  padding: 0.25rem 0.8rem;
  border-radius: 16px;
  margin-bottom: 0.75rem;

  ${({ round }) => {
    switch (round) {
      case 0:
        return `
          background-color: ${theme.colors.gray[50]};
          color: ${theme.colors.gray[700]};
        `;
      case 1:
        return `
          background-color: ${theme.colors.primaryPastel};
          color: ${theme.colors.primaryMain};
        `;
      case 2:
        return `
          background-color: #E8F9F1;
          color: #00CD70;
        `;
      case 3:
        return `
          background-color: #E8F3FF;
          color: #2890FF;
        `;
      case 4:
        return `
          background-color: #FFF0F0;
          color: #FF645B;
        `;
      default:
        return `
          background-color: ${theme.colors.gray[50]};
          color: ${theme.colors.gray[700]};
        `;
    }
  }}
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem;
`;

const RamenPairContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2.5rem;
`;

const RamenCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const RamenImageContainer = styled.div`
  width: 160px;
  height: 160px;
  margin-bottom: 0.75rem;
`;

const RamenImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function RamenWorldCupGamePage() {
  const navigate = useNavigate();
  const { currentRound, currentMatchRamens, handleSelect } = useRamenStore();

  const getRoundText = (round: number) => {
    switch (round) {
      case 0:
        return '라면 이상형 월드컵 16강';
      case 1:
        return '라면 이상형 월드컵 8강';
      case 2:
        return '라면 이상형 월드컵 4강';
      case 3:
        return '라면 이상형 월드컵 결승';
      default:
        return '라면 이상형 월드컵';
    }
  };

  const handleChoice = (ramenId: string) => {
    const isGameOver = handleSelect(ramenId);
    if (isGameOver) {
      navigate('/ramenworldcup/result');
    }
  };

  if (!currentMatchRamens || currentMatchRamens.length !== 2) return null;

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <Body>
        <Tag round={currentRound}>{getRoundText(currentRound)}</Tag>

        <ContentContainer>
          <Title1>둘 중에</Title1>
          <Title1>더 좋아하는 라면은?</Title1>
        </ContentContainer>

        <RamenPairContainer>
          {currentMatchRamens.map((ramen) => (
            <RamenCard key={ramen.id} onClick={() => handleChoice(ramen.id)}>
              <RamenImageContainer>
                <RamenImage src={RAMEN_IMAGES[ramen.imageKey]} alt={ramen.name} />
              </RamenImageContainer>
              <ChipText>{ramen.name}</ChipText>
            </RamenCard>
          ))}
        </RamenPairContainer>
      </Body>
    </Container>
  );
}
