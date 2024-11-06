import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import BackButton from './BackButton';

const meta: Meta<typeof BackButton> = {
  title: 'Components/common/BackButton',
  component: BackButton,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
      description: '아이콘의 너비',
      defaultValue: 24,
    },
    height: {
      control: { type: 'number', min: 16, max: 64, step: 4 },
      description: '아이콘의 높이',
      defaultValue: 24,
    },
    fill: {
      control: 'color',
      description: '아이콘의 색상',
      defaultValue: '#1D2228',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BackButton>;

// 기본 상태
export const Default: Story = {
  args: {
    width: 24,
    height: 24,
    fill: '#1D2228',
  },
};

// 큰 사이즈
export const Large: Story = {
  args: {
    width: 32,
    height: 32,
    fill: '#1D2228',
  },
};

// 작은 사이즈
export const Small: Story = {
  args: {
    width: 16,
    height: 16,
    fill: '#1D2228',
  },
};

// 다른 색상
export const CustomColor: Story = {
  args: {
    width: 24,
    height: 24,
    fill: '#007AFF',
  },
};

// 정사각형이 아닌 비율
export const CustomRatio: Story = {
  args: {
    width: 32,
    height: 24,
    fill: '#1D2228',
  },
};
