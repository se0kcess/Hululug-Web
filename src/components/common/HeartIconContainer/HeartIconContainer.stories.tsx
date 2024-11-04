import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { HeartIconContainer } from './HeartIconContainer';
import theme from '@/styles/theme';

const meta: Meta<typeof HeartIconContainer> = {
  title: 'Components/common/HeartIconContainer',
  component: HeartIconContainer,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{
            backgroundColor: theme.colors.black,
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: theme.colors.black },
        { name: 'gray', value: theme.colors.gray[700] },
        { name: 'light', value: theme.colors.white },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeartIconContainer>;

export const Default: Story = {
  args: {
    initialLikes: 100,
    recipeId: '1',
  },
};

export const HighLikeCount: Story = {
  args: {
    initialLikes: 999,
    recipeId: '2',
  },
};

export const LowLikeCount: Story = {
  args: {
    initialLikes: 10,
    recipeId: '3',
  },
};
