import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Comments from './Comments';

export default {
  title: 'Components/DetailPage/Comments',
  component: Comments,
  argTypes: {
    comments: { control: 'object' },
    recipeId: { control: 'number' },
    onCommentsUpdate: { action: 'comments updated' },
  },
} as Meta<typeof Comments>;

const Template: StoryFn<typeof Comments> = (args) => {
  const [comments, setComments] = useState<typeof args.comments>(args.comments);

  const handleCommentsUpdate = (updatedComments: typeof args.comments) => {
    setComments(updatedComments);
  };

  return <Comments {...args} comments={comments} onCommentsUpdate={handleCommentsUpdate} />;
};

export const Default = Template.bind({});
Default.args = {
  comments: [
    {
      id: 1,
      avatar: '../../src/assets/images/profile-img-2.png',
      name: '라면왕(나)',
      content: '라면왕은 전데요?',
      date: '2024.10.24',
      isOwnComment: true,
      edited: true,
    },
    {
      id: 2,
      avatar: '../../src/assets/images/profile-img-3.png',
      name: '롱스톤',
      content: '텍스처가 없잖아요',
      date: '2024.10.25',
      isOwnComment: false,
    },
    {
      id: 3,
      avatar: '../../src/assets/images/profile-img-4.png',
      name: '물코기',
      content: '물..물코기',
      date: '2024.10.25',
      isOwnComment: false,
    },
  ],
  recipeId: 123,
};
