import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { Tab } from '@/types/tab';

interface TabNavigationProps {
  tabs: Tab[];
  defaultActiveTab?: string;
  onTabChange: (tabId: string) => void;
}

const TabContainer = styled.nav`
  display: flex;
  border-bottom: 1px solid ${theme.colors.gray[100]};
  margin-bottom: 1rem;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? theme.colors.primaryMain : 'transparent')};
  color: ${({ isActive }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[500])};
  font-size: ${theme.typography.body.size};
  font-weight: ${theme.typography.weights.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    color: ${theme.colors.primaryMain};
  }
`;

export const TabNavigation = ({ tabs, defaultActiveTab, onTabChange }: TabNavigationProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          isActive={activeTab === tab.id}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabContainer>
  );
};
