import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { ActionBar } from './ActionBar';

const meta: Meta<typeof ActionBar> = {
  title: 'Components/DetailPage/ActionBar',
  component: ActionBar,
  decorators: [
    (Story) => (
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
    onLike: () => alert('Liked!'),
    onComment: () => alert('Commented!'),
    onBookmark: () => alert('Bookmarked!'),
    onShare: () => alert('Shared!'),
  },
};
