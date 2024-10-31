import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import RecipeIngredientsCon from './RecipeIngredientsCon';

export default {
  title: 'Components/RecipeIngredientsCon', // 스토리북에서 컴포넌트 위치를 지정
  component: RecipeIngredientsCon,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <RecipeIngredientsCon {...args} />;

export const Default = Template.bind({});
Default.args = {};
