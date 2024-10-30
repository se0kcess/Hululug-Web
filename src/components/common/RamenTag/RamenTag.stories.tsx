// components/RamenTag/RamenTag.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { RamenTag } from './RamenTag';
import theme from '@/styles/theme';

const meta: Meta<typeof RamenTag> = {
  title: 'Components/RamenTag',
  component: RamenTag,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: theme.colors.white },
        { name: 'black', value: theme.colors.black },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RamenTag>;

// 기본 태그 (삭제 버튼 없음)
export const Default: Story = {
  args: {
    ramen: {
      id: 1,
      name: '신라면',
    },
  },
};

// 삭제 버튼이 있는 태그
export const WithRemoveButton: Story = {
  args: {
    ramen: {
      id: 1,
      name: '신라면',
    },
    onRemove: () => console.log('Remove clicked'),
  },
};

// 여러 태그 보여주기
export const MultipleTagsRow = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <RamenTag ramen={{ id: 1, name: '신라면' }} onRemove={() => console.log('Remove 신라면')} />
      <RamenTag ramen={{ id: 2, name: '진라면' }} onRemove={() => console.log('Remove 진라면')} />
      <RamenTag ramen={{ id: 3, name: '너구리' }} onRemove={() => console.log('Remove 너구리')} />
    </div>
  ),
};
