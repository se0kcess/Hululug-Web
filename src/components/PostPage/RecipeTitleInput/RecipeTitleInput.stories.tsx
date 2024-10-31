import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import RecipeTitleInput from './RecipeTitleInput';

export default {
  title: 'Components/RecipeTitleInput', // 스토리북에서 컴포넌트 위치를 지정
  component: RecipeTitleInput,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <RecipeTitleInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: '제목을 입력해주세요.', // 기본 placeholder 텍스트
};
