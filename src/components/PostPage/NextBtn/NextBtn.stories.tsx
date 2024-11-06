import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import NextBtn from './NextBtn';

export default {
  title: 'Components/PostPage/NextBtn', // 스토리북에서 컴포넌트 위치를 지정
  component: NextBtn,
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
      description: 'Button 활성화 여부',
      defaultValue: true,
    },
  },
} as Meta;

const Template: StoryFn<typeof NextBtn> = (args) => <NextBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  isActive: true, // 기본값을 활성화 상태로 설정
};
