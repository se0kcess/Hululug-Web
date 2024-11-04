import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { Title1, BodyText } from '@/styles/Typography';
import { RAMEN_ID_MAP, RAMEN_IMAGES } from '@/constants/ramenWorldCupList';
import { useMemo } from 'react';
import { Medal } from '@/assets/images/Medals';
import BackButton from '@/components/common/BackButton/BackButton';
import { useRamenQuery } from '@/hooks/useRamenQuery';

const Container = styled.div`
  margin: 0 auto;
  background-color: ${theme.colors.secondaryLight};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const HeaderTitle = styled(Title1)`
  flex-grow: 1;
  text-align: center;
  margin-right: 2rem;
`;

const TopThreeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 1rem;
  margin-bottom: 2rem;
  gap: 2rem;
`;

const TopRankItem = styled.div<{ rank: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 6rem;
  position: relative;
  order: ${({ rank }) => {
    switch (rank) {
      case 1:
        return 2;
      case 2:
        return 1;
      case 3:
        return 3;
      default:
        return 0;
    }
  }};
  ${({ rank }) =>
    rank === 1 &&
    `
    transform: scale(1.1);  // 1등을 좀 더 크게
    margin-top: -1rem;      // 1등을 위로 올림
  `}
`;

const MedalContainer = styled.div`
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const RoundImageContainer = styled.div<{ rank: number }>`
  width: ${({ rank }) => (rank === 1 ? '5rem' : '4.5rem')};
  height: ${({ rank }) => (rank === 1 ? '5rem' : '4.5rem')};
  border-radius: 50%;
  border: 3px solid ${theme.colors.primaryLight};
  box-shadow: ${theme.shadows.orange};
  background-color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
`;

const RamenImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
`;

const RankingList = styled.div`
  background-color: ${theme.colors.white};
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem 1.25rem;
`;

const RankingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
`;

const RankNumber = styled(BodyText)`
  width: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.gray[700]};
`;

const RankImageContainer = styled.div`
  width: 5rem;
  height: 5rem;
  margin: 0 1rem;
`;

const RankInfo = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RamenName = styled(BodyText)`
  font-weight: 500;
`;

const WinRate = styled(BodyText)`
  color: ${theme.colors.gray[500]};
`;

export default function RamenWorldCupRankingPage() {
  const { getRamenList } = useRamenQuery();
  const { data: ramenData } = getRamenList;

  const rankingData = useMemo(() => {
    if (!ramenData?.data) return [];

    const { ramen, total_count } = ramenData.data;

    return ramen
      .map((item) => ({
        ...item,
        imageKey: RAMEN_ID_MAP[item._id].imageKey,
        // 각 라면의 승률 = (해당 라면 우승 횟수 / 전체 우승 횟수) * 100
        winRate: total_count > 0 ? ((item.count / total_count) * 100).toFixed(1) : '0.0',
      }))
      .sort((a, b) => Number(b.winRate) - Number(a.winRate));
  }, [ramenData]);

  const topThree = rankingData.slice(0, 3);
  const restRanking = rankingData.slice(3, 16);

  const orderedTopThree = useMemo(() => {
    const [first, second, third] = topThree;
    if (!first || !second || !third) return topThree;
    return [second, first, third];
  }, [topThree]);

  return (
    <Container>
      <Header>
        <BackButton />
        <HeaderTitle>라면 월드컵 순위</HeaderTitle>
      </Header>

      <TopThreeContainer>
        {orderedTopThree.map((ramen, index) => {
          const rank = index === 0 ? 2 : index === 1 ? 1 : 3;

          return (
            <TopRankItem key={ramen._id} rank={rank}>
              <MedalContainer>
                <Medal rank={rank as 1 | 2 | 3} size={rank === 1 ? 40 : 36} />
              </MedalContainer>
              <RoundImageContainer rank={rank}>
                <RamenImage src={RAMEN_IMAGES[ramen.imageKey]} alt={ramen.title} />
              </RoundImageContainer>
              <RamenName>{ramen.title}</RamenName>
              <WinRate>{ramen.winRate}%</WinRate>
            </TopRankItem>
          );
        })}
      </TopThreeContainer>

      <RankingList>
        {restRanking.map((ramen, index) => (
          <RankingItem key={ramen._id}>
            <RankNumber>{index + 4}</RankNumber>
            <RankImageContainer>
              <RamenImage src={RAMEN_IMAGES[ramen.imageKey]} alt={ramen.title} />
            </RankImageContainer>
            <RankInfo>
              <RamenName>{ramen.title}</RamenName>
              <WinRate>{ramen.winRate}%</WinRate>
            </RankInfo>
          </RankingItem>
        ))}
      </RankingList>
    </Container>
  );
}
