import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import RamenTypeSelect from './RamenTypeSelect';

export default {
  title: 'Components/PostPage/RamenTypeSelect', // 스토리북에서 컴포넌트 위치를 지정
  component: RamenTypeSelect,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

const Template: StoryFn = (args) => <RamenTypeSelect {...args} />;

export const Default = Template.bind({});
Default.args = {};
