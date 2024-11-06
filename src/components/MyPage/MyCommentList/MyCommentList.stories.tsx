import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import MyCommentList from './MyCommentList';
import theme from '@/styles/theme';

const meta: Meta<typeof MyCommentList> = {
  title: 'Components/MyPage/MyCommentList',
  component: MyCommentList,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white' }}>
            <Story />
          </div>
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: theme.colors.white },
        { name: 'gray', value: theme.colors.gray[50] },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MyCommentList>;

const sampleComments = [
  {
    id: '1',
    recipeId: '1',
    recipeName: '초간단 1분 라볶이',
    content: '라볶이 맛있겠다',
    createdAt: '2024-10-23',
  },
  {
    id: '2',
    recipeId: '2',
    recipeName: '초간단 1분 라볶이',
    content: '라볶이 맛있겠다',
    createdAt: '2024-10-23',
  },
  {
    id: '3',
    recipeId: '3',
    recipeName: '초간단 1분 라볶이',
    content: '라볶이 맛있겠다',
    createdAt: '2024-10-23',
  },
];

export const Default: Story = {
  args: {
    comments: sampleComments,
  },
};

export const SingleComment: Story = {
  args: {
    comments: [sampleComments[0]],
  },
};

export const LongContent: Story = {
  args: {
    comments: [
      {
        ...sampleComments[0],
        content:
          '이 레시피 정말 맛있어 보여요! 저도 꼭 한번 따라해보고 싶네요. 재료도 간단하고 설명도 자세해서 좋습니다. 다음에 꼭 해먹어볼게요!',
      },
    ],
  },
};
