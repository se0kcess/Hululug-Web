import type { Meta, StoryObj } from '@storybook/react';
import { HotRecipeCard } from './HotRecipeCard';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

const meta: Meta<typeof HotRecipeCard> = {
  title: 'Components/MainPage/HotRecipeCard',
  component: HotRecipeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '인기 레시피를 보여주는 카드 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ width: '300px', padding: '1rem', background: '#f5f5f5' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof HotRecipeCard>;

const sampleRecipe = {
  _id: '1',
  recipe_id: 'recipe1',
  title: '매콤한 신라면 끓이기',
  thumbnail: 'https://via.placeholder.com/300x225',
  tags: ['6721a9eb7e7f8b4e11d49d46'],
  writer: {
    nickname: '라면마스터',
    profile_image: 'https://via.placeholder.com/40x40',
  },
  likes: 128,
  created_at: '2024-01-15T09:00:00.000Z',
};

export const Default: Story = {
  args: {
    ...sampleRecipe,
    onClick: () => console.log('Card clicked'),
  },
};

export const LongTitle: Story = {
  args: {
    ...sampleRecipe,
    title: '정말 맛있는 신라면 끓이는 방법 - 라면 요리의 모든 것을 알려드립니다 (신라면 레시피)',
  },
};

export const NoImage: Story = {
  args: {
    ...sampleRecipe,
    thumbnail: '',
    writer: {
      ...sampleRecipe.writer,
      profile_image: '',
    },
  },
};

export const ManyLikes: Story = {
  args: {
    ...sampleRecipe,
    likes: 9999,
  },
};
