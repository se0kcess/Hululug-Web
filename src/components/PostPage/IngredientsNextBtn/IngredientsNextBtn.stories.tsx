import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import IngredientsNextBtn from './IngredientsNextBtn';

export default {
  title: 'Components/PostPage/IngredientsNextBtn', // 스토리북에서 컴포넌트 위치를 지정
  component: IngredientsNextBtn,
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

const Template: StoryFn<typeof IngredientsNextBtn> = (args) => <IngredientsNextBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  isActive: false, // 기본값을 비활성화 상태로 설정
};
