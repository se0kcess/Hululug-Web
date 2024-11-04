// components/signup/ProfileImageUpload.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileImageUpload } from './ProfileImageUpload';
import { ThemeProvider } from '@emotion/react';
import theme from '../../styles/theme';

const meta: Meta<typeof ProfileImageUpload> = {
  title: 'Components/Signup/ProfileImageUpload',
  component: ProfileImageUpload,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '프로필 이미지를 업로드할 수 있는 컴포넌트입니다. 기본 이미지가 제공되며, 우측 하단의 + 버튼을 클릭하여 새로운 이미지를 업로드할 수 있습니다.',
      },
    },
  },
  argTypes: {
    onImageUpload: {
      description: '이미지가 선택되었을 때 호출되는 콜백 함수',
      action: 'image uploaded',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileImageUpload>;

// 기본 스토리
export const Default: Story = {
  args: {
    onImageUpload: (file: File) => console.log('Uploaded file:', file.name),
  },
};

// 작은 사이즈 버전
export const Small: Story = {
  args: {
    onImageUpload: (file: File) => console.log('Uploaded file:', file.name),
  },
  render: (args) => (
    <div style={{ width: '80px' }}>
      <ProfileImageUpload {...args} size="small" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '작은 사이즈(80px)의 프로필 이미지 업로더입니다.',
      },
    },
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    onImageUpload: (file: File) => console.log('Uploaded file:', file.name),
    error: '이미지 업로드에 실패했습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: '에러 메시지가 표시되는 상태입니다.',
      },
    },
  },
};

// 로딩 상태
export const Loading: Story = {
  args: {
    onImageUpload: (file: File) => console.log('Uploaded file:', file.name),
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: '이미지 업로드 중인 로딩 상태를 보여줍니다.',
      },
    },
  },
};
