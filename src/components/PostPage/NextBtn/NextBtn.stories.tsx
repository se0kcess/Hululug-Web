import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import NextBtn from './NextBtn';

export default {
  title: 'Components/NextBtn', // 스토리북에서 컴포넌트 위치를 지정
  component: NextBtn,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <NextBtn {...args} />;

export const Default = Template.bind({});
Default.args = {};
