import type { Meta, StoryObj } from '@storybook/react';
import HotRecipeCard from './HotRecipeCard';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

const meta: Meta<typeof HotRecipeCard> = {
  title: 'Components/HotRecipeCard',
  component: HotRecipeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '인기 레시피를 보여주는 카드 컴포넌트입니다. 레시피 이미지, 제목, 작성자 정보, 좋아요 기능을 포함합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ width: '360px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    id: {
      control: 'text',
      description: '레시피의 고유 ID',
    },
    title: {
      control: 'text',
      description: '레시피 제목',
    },
    author: {
      control: 'text',
      description: '작성자 이름',
    },
    likes: {
      control: 'number',
      description: '좋아요 수',
    },
    onClick: {
      action: 'clicked',
      description: '카드 클릭 핸들러',
    },
  },
} satisfies Meta<typeof HotRecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'recipe1',
    title: '초간단 1분 라볶이',
    author: '백종원',
    likes: 1100,
  },
};

export const LongTitle: Story = {
  args: {
    id: 'recipe2',
    title: '맛있는 초간단 1분 라볶이 만들기 레시피 따라하기 손쉽게 만드는 방법',
    author: '백종원',
    likes: 1100,
  },
};
