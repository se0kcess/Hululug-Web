import type { Meta, StoryObj } from '@storybook/react';
import RamenList, { RamenRecipe } from './RamenList';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

// 스토리북용 샘플 데이터
const sampleRecipes: RamenRecipe[] = [
  {
    id: '1',
    title: '초간단 1분 라볶이',
    author: '백종원',
    authorImage: '/src/assets/images/profile-img-1.png',
    likes: 1100,
    date: '2024.10.23',
    image: '/src/assets/ramyun-images/sample-1.png',
    ramenType: { id: 1, name: '신라면' },
    bookmarkId: 'bookmark-1', // number -> string으로 변경
  },
  {
    id: '2',
    title: '매콤한 라면 레시피',
    author: '김쉐프',
    authorImage: '/src/assets/images/profile-img-2.png',
    likes: 850,
    date: '2024.10.22',
    image: '/src/assets/ramyun-images/sample-2.png',
    ramenType: { id: 2, name: '진라면' },
    bookmarkId: 'bookmark-2', // number -> string으로 변경
  },
];

const meta: Meta<typeof RamenList> = {
  title: 'Components/common/RamenList',
  component: RamenList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '라면 레시피 목록을 보여주는 리스트 컴포넌트입니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '1rem',
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onRecipeClick: { action: 'recipe clicked' },
  },
} satisfies Meta<typeof RamenList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleItem: Story = {
  args: {
    recipes: [sampleRecipes[0]],
  },
};

export const LongTitle: Story = {
  args: {
    recipes: [
      {
        ...sampleRecipes[0],
        title: '매우 맛있는 초간단 1분 라볶이 레시피 따라하기 정말 쉽고 간단한 레시피',
      },
      ...sampleRecipes.slice(1),
    ],
  },
};

export const ManyItems: Story = {
  args: {
    recipes: Array(5)
      .fill(null)
      .map((_, index) => ({
        ...sampleRecipes[0],
        id: `${index + 1}`,
        title: `라면 레시피 ${index + 1}`,
        bookmarkId: `bookmark-${index + 1}`, // number -> string으로 변경하고 의미있는 prefix 추가
      })),
  },
};
