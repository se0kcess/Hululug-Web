// CommentInput.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import CommentInput, { CommentFormProps } from './CommentInput';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Initialize a QueryClient for React Query
const queryClient = new QueryClient();

export default {
  title: 'Components/CommentInput',
  component: CommentInput,
  argTypes: {
    onCommentAdded: { action: 'comment added' },
  },
} as Meta;

// Story template with QueryClientProvider
const Template: StoryFn<CommentFormProps> = (args) => (
  <QueryClientProvider client={queryClient}>
    <CommentInput {...args} />
  </QueryClientProvider>
);

export const Default = Template.bind({});
Default.args = {
  recipeId: 'sampleRecipeId',
  isLoggedIn: true,
  onCommentAdded: (newComment: string) => console.log('New comment:', newComment),
};
