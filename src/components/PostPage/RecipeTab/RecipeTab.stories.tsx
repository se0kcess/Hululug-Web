import { Meta, StoryFn } from '@storybook/react';
import RecipeTab from './RecipeTab';

export default {
  title: 'Components/RecipeTab', // 스토리북 내 컴포넌트 위치를 지정
  component: RecipeTab,
} as Meta;

const Template: StoryFn = (args) => (
  <div style={{ width: '400px', display: 'flex', margin: '0 auto' }}>
    <RecipeTab {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
