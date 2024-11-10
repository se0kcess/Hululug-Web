import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { ActionBar } from './ActionBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1분
    },
  },
});

const meta: Meta<typeof ActionBar> = {
  title: 'Components/DetailPage/ActionBar',
  component: ActionBar,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              backgroundColor: theme.colors.white,
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: theme.colors.white },
        { name: 'dark', value: theme.colors.black },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionBar>;

export const Default: Story = {
  args: {
    likes: 1100,
    comments: 14,
    recipeId: '1',
    onComment: () => alert('Commented!'),
    onBookmark: () => alert('Bookmarked!'),
    onShare: () => alert('Shared!'),
  },
};

// 추가 스토리 예시
export const WithNoLikes: Story = {
  args: {
    likes: 0,
    comments: 0,
    recipeId: '2',
    onComment: () => alert('Commented!'),
    onBookmark: () => alert('Bookmarked!'),
    onShare: () => alert('Shared!'),
  },
};

export const WithCustomColors: Story = {
  args: {
    ...Default.args,
    bookmarkActiveColor: theme.colors.primaryDark,
    bookmarkInactiveColor: theme.colors.gray[200],
  },
};
