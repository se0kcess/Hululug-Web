import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { useRamenStore } from '@/store/ramenStore';
import { ButtonText, Title1 } from '@/styles/Typography';
import BackButton from '@/components/common/BackButton/BackButton';
import ramenlogo from '@assets/ramyun-images/shin-ramyun.png';
import { useRamenQuery } from '@/hooks/useRamenQuery';

const Container = styled.div`
  margin: 0 auto;
  width: 90%;
  background-color: ${theme.colors.white};
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 2rem 0;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tag = styled.div`
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 16px;
  background-color: ${theme.colors.primaryPastel};
  color: ${theme.colors.primaryMain};
  margin-bottom: 1rem;
`;

const RamenImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin: 2rem 0;
`;

const StartButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${theme.colors.primaryMain};
  color: ${theme.colors.white};
  border: none;
  cursor: pointer;
  margin-top: 1.5rem;
`;

export default function RamenWorldCupStartPage() {
  const navigate = useNavigate();
  const { initializeRamenList } = useRamenStore();
  const { getRamenList } = useRamenQuery();

  const handleStart = async () => {
    try {
      const { data } = await getRamenList.refetch();
      if (data?.data.ramen) {
        initializeRamenList(data.data.ramen);
        navigate('/ramenworldcup/game');
      }
    } catch (error) {
      console.error('라면 데이터 로딩 실패:', error);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>
      <Body>
        <Tag>라면 이상형 월드컵</Tag>
        <Title1>나의 최애</Title1>
        <Title1>라면 고르기</Title1>

        <RamenImage src={ramenlogo} alt="라면" />

        <StartButton onClick={handleStart} disabled={getRamenList.isLoading}>
          <ButtonText>{getRamenList.isLoading ? '로딩 중...' : '테스트 시작하기'}</ButtonText>
        </StartButton>
      </Body>
    </Container>
  );
}
