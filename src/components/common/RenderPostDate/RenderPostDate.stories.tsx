// components/RenderPostDate/RenderPostDate.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { RenderPostDate } from './RenderPostDate';
import theme from '@/styles/theme';

const meta: Meta<typeof RenderPostDate> = {
  title: 'Components/RenderPostDate',
  component: RenderPostDate,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '게시물의 작성 날짜를 표시하는 컴포넌트입니다. YY.MM.DD 형식으로 날짜를 표시하며, 캘린더 아이콘이 함께 표시됩니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RenderPostDate>;

// 기본 사용 예시
export const Default: Story = {
  args: {
    date: '2024-10-23',
  },
};

// 오늘 날짜
export const Today: Story = {
  args: {
    date: new Date(),
  },
};

// 레시피 카드에서의 사용 예시
export const InRecipeCard = {
  render: () => (
    <div
      style={{
        width: '300px',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: theme.shadows[1],
        background: theme.colors.white,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '160px',
          background: theme.colors.gray[200],
          borderRadius: '4px',
          marginBottom: '12px',
        }}
      />
      <div
        style={{
          padding: '8px',
          background: theme.colors.primaryPastel,
          color: theme.colors.primaryMain,
          borderRadius: '16px',
          display: 'inline-block',
          fontSize: '14px',
          marginBottom: '8px',
        }}
      >
        신라면
      </div>
      <h3
        style={{
          margin: '8px 0',
          color: theme.colors.black,
          fontSize: theme.typography.title2.size,
        }}
      >
        초간단 1분 라볶이
      </h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <RenderPostDate date="2024-10-23" />
        <span style={{ color: theme.colors.gray[500] }}>백종원</span>
      </div>
    </div>
  ),
};
