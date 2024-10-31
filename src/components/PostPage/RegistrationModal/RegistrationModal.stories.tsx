import { Meta, StoryFn } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import RegistrationModal from './RegistrationModal';

export default {
  title: 'Components/PostPage/RegistrationModal',
  component: RegistrationModal,
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

const Template: StoryFn<typeof RegistrationModal> = (args) => <RegistrationModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
