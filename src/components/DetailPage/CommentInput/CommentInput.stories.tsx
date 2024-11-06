// CommentInput.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import CommentInput, { CommentFormProps } from './CommentInput';

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  argTypes: {
    isLoggedIn: { control: 'boolean' },
    onCommentAdded: { action: 'onCommentAdded' },
  },
} as Meta;

const Template: StoryFn<CommentFormProps> = (args) => <CommentInput {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  recipeId: 'sampleRecipeId',
  isLoggedIn: true,
  onCommentAdded: (newComment) => console.log('Comment added:', newComment),
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  recipeId: 'sampleRecipeId',
  isLoggedIn: false,
  onCommentAdded: (newComment) => console.log('Comment added:', newComment),
};
