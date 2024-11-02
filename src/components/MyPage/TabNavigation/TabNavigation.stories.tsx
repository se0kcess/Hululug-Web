// TabNavigation.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { TabNavigation } from './TabNavigation';

const meta = {
  title: 'Components/TabNavigation',
  component: TabNavigation,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '탭 형태의 네비게이션을 제공하는 컴포넌트입니다. 여러 섹션의 콘텐츠를 쉽게 탐색할 수 있게 해줍니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      description: '탭 목록',
      control: 'object',
    },
    defaultActiveTab: {
      description: '초기 활성화될 탭의 ID',
      control: 'text',
    },
    onTabChange: {
      description: '탭 변경 시 호출되는 콜백 함수',
      action: 'tabChanged',
    },
  },
} satisfies Meta<typeof TabNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 탭 네비게이션
export const Default: Story = {
  args: {
    tabs: [
      { id: 'recipes', label: '내 레시피' },
      { id: 'bookmarks', label: '북마크' },
      { id: 'comments', label: '내 댓글' },
    ],
    defaultActiveTab: 'recipes',
    onTabChange: (tabId) => console.log(`Tab changed to: ${tabId}`),
  },
};

// 2개 탭
export const TwoTabs: Story = {
  args: {
    tabs: [
      { id: 'ongoing', label: '진행중' },
      { id: 'completed', label: '완료' },
    ],
    onTabChange: (tabId) => console.log(`Tab changed to: ${tabId}`),
  },
};

// 많은 탭
export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: 'all', label: '전체' },
      { id: 'korean', label: '한식' },
      { id: 'chinese', label: '중식' },
      { id: 'japanese', label: '일식' },
      { id: 'western', label: '양식' },
      { id: 'dessert', label: '디저트' },
    ],
    onTabChange: (tabId) => console.log(`Tab changed to: ${tabId}`),
  },
};
