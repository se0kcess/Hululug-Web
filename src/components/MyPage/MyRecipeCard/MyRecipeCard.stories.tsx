import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import MyRecipeCard from './MyRecipeCard';
import theme from '@/styles/theme';

const meta: Meta<typeof MyRecipeCard> = {
  title: 'Components/MyPage/MyRecipeCard',
  component: MyRecipeCard,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ maxWidth: '360px', padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: theme.colors.gray[50] },
        { name: 'dark', value: theme.colors.black },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyRecipeCard>;

export const Default: Story = {
  args: {
    id: '1',
    title: '초간단 1분 라볶이',
    ramen: {
      id: 1,
      name: '신라면',
    },
    date: '2024.10.23',
    likes: 1100,
  },
};

export const LongTitle: Story = {
  args: {
    id: '2',
    title: '너무너무너무너무너무너무너무 맛있는 초간단 1분 라볶이 레시피',
    ramen: {
      id: 2,
      name: '신라면',
    },
    date: '2024.10.23',
    likes: 999,
  },
};
