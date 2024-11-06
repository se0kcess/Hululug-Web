// Comments.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import Comments, { CommentsProps } from './Comments';
import { Comment } from '@/types/comment';

export default {
  title: 'Components/Comments',
  component: Comments,
  argTypes: {
    onCommentsUpdate: { action: 'comments updated' },
  },
} as Meta;

const Template: StoryFn<CommentsProps> = (args) => <Comments {...args} />;

export const Default = Template.bind({});
Default.args = {
  recipeId: 'sampleRecipeId',
  onCommentsUpdate: (updatedComments: Comment[]) =>
    console.log('Comments updated:', updatedComments),
};

export const WithMockData = Template.bind({});
WithMockData.args = {
  recipeId: 'sampleRecipeId',
  onCommentsUpdate: (updatedComments: Comment[]) =>
    console.log('Comments updated:', updatedComments),
};

// WithMockData에 mockComments를 적용하여 Storybook에서 데이터 제공
WithMockData.decorators = [
  (Story) => (
    <div>
      <Story {...WithMockData.args} />
    </div>
  ),
];
