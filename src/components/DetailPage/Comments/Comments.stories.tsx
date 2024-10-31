import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Comments from './Comments';

export default {
  title: 'Components/Comments',
  component: Comments,
  argTypes: {
    onDeleteRequest: { action: 'delete requested' },
    onCommentsUpdate: { action: 'comments updated' },
  },
} as Meta<typeof Comments>;

const Template: StoryFn<typeof Comments> = (args) => {
  const [comments, setComments] = useState(args.comments);

  const handleDeleteRequest = (commentId: number) => {
    // 댓글 삭제: 댓글 ID로 필터링하여 상태 업데이트
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
    args.onDeleteRequest(commentId); // 스토리북 액션 로깅
  };

  const handleCommentsUpdate = (commentId: number) => {
    // 댓글 수정: 예시로 `edited` 상태 업데이트
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, edited: !comment.edited } : comment,
    );
    setComments(updatedComments);
    args.onCommentsUpdate(commentId); // 스토리북 액션 로깅
  };

  return (
    <Comments
      {...args}
      comments={comments}
      onDeleteRequest={handleDeleteRequest}
      onCommentsUpdate={handleCommentsUpdate}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  // recipeId: 123,
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
};
