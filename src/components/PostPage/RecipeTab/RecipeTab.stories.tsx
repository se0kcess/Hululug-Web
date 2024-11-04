import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RecipeTab from './RecipeTab';

export default {
  title: 'Components/PostPage/RecipeTab',
  component: RecipeTab,
  argTypes: {
    activeTab: { control: 'text' },
    onTabChange: { action: 'tab changed' },
  },
} as Meta<typeof RecipeTab>;

const Template: StoryFn<typeof RecipeTab> = (args) => {
  const [activeTab, setActiveTab] = useState(args.activeTab || '레시피 소개');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    args.onTabChange(tab);
  };

  return <RecipeTab {...args} activeTab={activeTab} onTabChange={handleTabChange} />;
};

export const Default = Template.bind({});
Default.args = {
  activeTab: '레시피 소개',
};
