import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import ProfileSettingsButton from './ProfileSettingsButton';

const meta: Meta<typeof ProfileSettingsButton> = {
  title: 'Components/ProfileSettingsButton',
  component: ProfileSettingsButton,
  parameters: {
    layout: 'centered',
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
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    onLogout: {
      description: '로그아웃 처리를 위한 콜백 함수',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfileSettingsButton>;

// 기본 상태
export const Default: Story = {
  args: {
    onLogout: action('onLogout'),
  },
};

// 모바일 뷰
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    onLogout: action('onLogout'),
  },
};
