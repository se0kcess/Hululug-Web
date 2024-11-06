import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import WithdrawModal from '@/components/WithdrawPage/WithdrawModal/WithdrawModal';

export default {
  title: 'Components/WithdrawPage/WithdrawModal',
  component: WithdrawModal,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'black', // 배경색을 검정으로 설정
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onCancel: { action: '취소 클릭됨' },
    onRegister: { action: '등록 클릭됨' },
  },
} as Meta;

const Template: StoryFn<typeof WithdrawModal> = (args) => <WithdrawModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
