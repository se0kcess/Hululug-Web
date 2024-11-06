import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { CommentIconContainer } from './CommentIconContainer';

const meta: Meta<typeof CommentIconContainer> = {
  title: 'Components/DetailPage/CommentIconContainer',
  component: CommentIconContainer,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
type Story = StoryObj<typeof CommentIconContainer>;

export const OutlineIcon: Story = {
  args: {
    commentCount: 15,
    showFilledIcon: false, // CommentOutline 아이콘을 보여줍니다.
  },
};

export const FilledIcon: Story = {
  args: {
    commentCount: 15,
    showFilledIcon: true, // CommentFill 아이콘을 보여줍니다.
  },
};

export const NoComments: Story = {
  args: {
    commentCount: 0,
    showFilledIcon: false,
  },
};

export const ManyCommentsFilled: Story = {
  args: {
    commentCount: 120,
    showFilledIcon: true,
  },
};
