// components/signup/SignupForm.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { userEvent, within } from '@storybook/testing-library';
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

// 기본 스토리
export const Default: Story = {};

// 자기소개 입력 스토리
export const WithDescription: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const descriptionInput = canvas.getByPlaceholderText('간단한 자기소개를 작성해주세요.');

    await userEvent.type(descriptionInput, '안녕하세요! 요리를 좋아하는 백종원입니다.');
  },
  parameters: {
    docs: {
      description: {
        story: '자기소개 입력 필드 사용 예시입니다.',
      },
    },
  },
};

// 에러 상태 스토리
export const WithError: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nicknameInput = canvas.getByPlaceholderText('닉네임을 입력해주세요.');

    // 최소 길이보다 짧은 닉네임 입력
    await userEvent.type(nicknameInput, '김');
    await userEvent.tab();
  },
  parameters: {
    docs: {
      description: {
        story: '닉네임이 유효성 검사를 통과하지 못했을 때의 에러 상태를 보여줍니다.',
      },
    },
  },
};

// 최대 길이 테스트 스토리
export const MaxLengthTest: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 닉네임 최대 길이 테스트
    const nicknameInput = canvas.getByPlaceholderText('닉네임을 입력해주세요.');
    await userEvent.type(nicknameInput, '백종원쉐프마스터코리아');

    // 자기소개 최대 길이 테스트
    const descriptionInput = canvas.getByPlaceholderText('간단한 자기소개를 작성해주세요.');
    await userEvent.type(
      descriptionInput,
      '안녕하세요 저는 맛있는 요리를 사랑하는 요리사입니다. 많은 관심 부탁드립니다!',
    );
  },
  parameters: {
    docs: {
      description: {
        story: '입력 필드의 최대 길이 제한을 테스트하는 예시입니다.',
      },
    },
  },
};
