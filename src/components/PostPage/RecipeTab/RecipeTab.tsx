import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText } from '@/styles/Typography';

const TabContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const Tab = styled(BodyText)<{ isActive: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  color: ${({ isActive }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[200])};
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[200])};
  transition:
    color 0.3s,
    border-bottom 0.3s;
`;

interface RecipeTabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const RecipeTab = ({ activeTab }: RecipeTabProps) => {
  const tabs = ['레시피 소개', '레시피 재료', '레시피 순서'];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab key={tab} isActive={activeTab === tab}>
          {tab}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default RecipeTab;
