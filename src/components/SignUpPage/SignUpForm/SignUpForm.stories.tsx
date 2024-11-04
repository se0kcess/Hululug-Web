import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { SignupForm } from '@/components/SignUpPage/SignUpForm/SignUpForm';
import theme from '@/styles/theme';

const meta: Meta<typeof SignupForm> = {
  title: 'Components/Signup/SignupForm',
  component: SignupForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{ maxWidth: '480px', margin: '0 auto', background: 'white', minHeight: '100vh' }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '회원가입 시 사용자의 프로필 정보를 입력받는 폼 컴포넌트입니다. 닉네임과 프로필 이미지, 자기소개를 입력할 수 있습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {};
