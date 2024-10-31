import { useState } from 'react';
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
  flex: 1; /* 각 탭이 동일한 비율로 공간을 차지하도록 설정 */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  cursor: pointer;
  box-sizing: border-box;

  color: ${({ isActive }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[200])};
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[200])};
  transition:
    color 0.3s,
    border-bottom 0.3s;
`;

const RecipeTab = () => {
  const [activeTab, setActiveTab] = useState('레시피 소개');

  const tabs = ['레시피 소개', '레시피 재료', '레시피 순서'];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab key={tab} isActive={activeTab === tab} onClick={() => setActiveTab(tab)}>
          {tab}
        </Tab>
      ))}
    </TabContainer>
  );
};

export default RecipeTab;
