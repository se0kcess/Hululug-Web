import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';

const TabContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Tab = styled.div<{ isActive: boolean }>`
  flex: 1;
  padding: 12px 0;
  text-align: center;
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[200])};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
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
