// RamenList.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { RamenList } from './RamenList';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { Recipe } from '@/types/ramenRecipe';

const meta: Meta<typeof RamenList> = {
  title: 'Components/Common/RamenList',
  component: RamenList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '라면 레시피 목록을 보여주는 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{ maxWidth: '768px', margin: '0 auto', background: '#f5f5f5', padding: '1rem' }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RamenList>;

// 샘플 데이터
const sampleRecipes: Recipe[] = [
  {
    _id: '1',
    recipe_id: 'recipe1',
    title: '매콤한 신라면 끓이기',
    thumbnail: 'https://via.placeholder.com/130x110',
    tags: ['6721a9eb7e7f8b4e11d49d46'], // 신라면
    writer: {
      nickname: '라면마스터',
      profile_image: 'https://via.placeholder.com/40x40',
    },
    likes: 128,
    created_at: '2024-01-15T09:00:00.000Z',
  },
  {
    _id: '2',
    recipe_id: 'recipe2',
    title: '진짜 맛있는 짜파게티 만들기',
    thumbnail: 'https://via.placeholder.com/130x110',
    tags: ['6721aa637e7f8b4e11d49d4e'], // 짜파게티
    writer: {
      nickname: '요리왕',
      profile_image: 'https://via.placeholder.com/40x40',
    },
    likes: 256,
    created_at: '2024-01-14T15:30:00.000Z',
  },
  {
    _id: '3',
    recipe_id: 'recipe3',
    title: '간짬뽕 얼큰하게 끓이는 방법',
    thumbnail: 'https://via.placeholder.com/130x110',
    tags: ['6721a89a42a7d479b161b385'], // 간짬뽕
    writer: {
      nickname: '라면코치',
      profile_image: 'https://via.placeholder.com/40x40',
    },
    likes: 64,
    created_at: '2024-01-13T12:00:00.000Z',
  },
];

// 기본 상태
export const Default: Story = {
  args: {
    recipes: sampleRecipes,
    onRecipeClick: (id) => console.log('Clicked recipe:', id),
  },
};

// 단일 레시피
export const SingleRecipe: Story = {
  args: {
    recipes: [sampleRecipes[0]],
    onRecipeClick: (id) => console.log('Clicked recipe:', id),
  },
};

// 이미지 없는 상태
export const NoImage: Story = {
  args: {
    recipes: [
      {
        ...sampleRecipes[0],
        thumbnail: '',
        writer: {
          ...sampleRecipes[0].writer,
          profile_image: '',
        },
      },
    ],
  },
};

// 긴 제목
export const LongTitle: Story = {
  args: {
    recipes: [
      {
        ...sampleRecipes[0],
        title:
          '정말 맛있는 신라면 끓이는 방법 - 라면 요리의 모든 것을 알려드립니다 (신라면 레시피)',
      },
    ],
  },
};

// 많은 좋아요
export const ManyLikes: Story = {
  args: {
    recipes: [
      {
        ...sampleRecipes[0],
        likes: 9999,
      },
    ],
  },
};

// 로딩 상태 (옵션)
export const Loading: Story = {
  render: () => (
    <div style={{ opacity: 0.5, pointerEvents: 'none' }}>
      <RamenList recipes={sampleRecipes} />
    </div>
  ),
};

// 여러 개의 레시피 (스크롤 테스트)
export const ManyRecipes: Story = {
  args: {
    recipes: Array(10)
      .fill(null)
      .map((_, index) => ({
        ...sampleRecipes[index % 3],
        _id: `${index + 1}`,
        recipe_id: `recipe${index + 1}`,
      })),
  },
};

// 모바일 뷰
export const MobileView: Story = {
  args: {
    recipes: sampleRecipes,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// 인터랙션 데모
export const InteractionDemo: Story = {
  render: () => {
    const handleRecipeClick = (id: string) => {
      alert(`레시피 클릭: ${id}`);
    };

    return <RamenList recipes={sampleRecipes} onRecipeClick={handleRecipeClick} />;
  },
};
