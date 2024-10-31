import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import RecipeIntroInput from './RecipeIntroInput';

export default {
  title: 'Components/PostPage/RecipeIntroInput', // 스토리북에서 컴포넌트 위치를 지정
  component: RecipeIntroInput,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <RecipeIntroInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '간단한 레시피 소개를 입력해주세요.', // 기본 placeholder 텍스트
};
