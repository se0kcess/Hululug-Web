import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import MyPageModal from '@/components/MyPage/MyPageModal/MyPageModal';

const meta: Meta<typeof MyPageModal> = {
  title: 'Components/MyPageModal',
  component: MyPageModal,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'dark', value: '#1D2228' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '바텀 시트의 열림/닫힘 상태를 제어합니다.',
    },
    onClose: {
      description: '바텀 시트가 닫힐 때 호출되는 함수입니다.',
    },
    onLogout: {
      description: '로그아웃 버튼 클릭 시 호출되는 함수입니다.',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyPageModal>;

// 기본 상태 (닫힘)
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: action('onClose'),
    onLogout: action('onLogout'),
  },
};

// 열린 상태
export const Opened: Story = {
  args: {
    isOpen: true,
    onClose: action('onClose'),
    onLogout: action('onLogout'),
  },
};

// 사용 예시를 포함한 스토리
export const WithExample: Story = {
  render: () => {
    return (
      <div style={{ padding: '20px' }}>
        <button
          onClick={() => {}}
          style={{
            padding: '8px 16px',
            backgroundColor: '#FF9500',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
          }}
        >
          설정 버튼 (예시)
        </button>
        <MyPageModal isOpen={true} onClose={action('onClose')} onLogout={action('onLogout')} />
      </div>
    );
  },
};

// 반응형 테스트를 위한 스토리
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    isOpen: true,
    onClose: action('onClose'),
    onLogout: action('onLogout'),
  },
};
