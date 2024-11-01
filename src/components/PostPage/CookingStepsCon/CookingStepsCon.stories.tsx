import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import CookingStepsCon from './CookingStepsCon';

export default {
  title: 'Components/PostPage/CookingStepsCon', // 스토리북에서 컴포넌트 위치를 지정
  component: CookingStepsCon,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn<typeof CookingStepsCon> = () => <CookingStepsCon />;

export const Default = Template.bind({});
Default.args = {};
