import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import CompletedBtnCon from './CompletedBtnCon';

export default {
  title: 'Components/PostPage/CompletedBtnCon', // 스토리북에서 컴포넌트 위치를 지정
  component: CompletedBtnCon,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    isActive: {
      control: 'boolean', // boolean 타입의 컨트롤 추가
      description: '다음 버튼 활성화 여부',
      defaultValue: false,
    },
  },
} as Meta;

const Template: StoryFn<typeof CompletedBtnCon> = (args) => <CompletedBtnCon {...args} />;

export const Default = Template.bind({});
Default.args = {
  isActive: false, // 기본값을 비활성화 상태로 설정
};
