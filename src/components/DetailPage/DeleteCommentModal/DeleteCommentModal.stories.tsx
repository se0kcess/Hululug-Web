import { Meta, StoryFn } from '@storybook/react';
import DeleteCommentModal, { Button, ButtonGroup, Message } from './DeleteCommentModal';

export default {
  title: 'Components/DeleteCommentModal',
  component: DeleteCommentModal,
  argTypes: {
    onCancel: { action: '취소' },
    onDelete: { action: '삭제' },
  },
} as Meta<typeof DeleteCommentModal>;

// 기본 DeleteCommentModal 스토리
const Template: StoryFn<typeof DeleteCommentModal> = (args) => <DeleteCommentModal {...args} />;
export const Default = Template.bind({});
Default.args = {};

// Message 컴포넌트 스토리
export const MessageTitle: StoryFn = () => <Message>댓글을 삭제하시겠습니까?</Message>;

// ButtonGroup 스토리 (단일 버튼 그룹 컨테이너)
export const Buttons: StoryFn = () => (
  <ButtonGroup>
    <Button onClick={() => console.log('취소')}>취소</Button>
    <Button primary onClick={() => console.log('삭제')}>
      삭제
    </Button>
  </ButtonGroup>
);

// 개별 버튼 스토리 (삭제 버튼과 취소 버튼)
export const DeleteButton: StoryFn = () => (
  <Button primary onClick={() => console.log('삭제 클릭')}>
    삭제
  </Button>
);
export const CancelButton: StoryFn = () => (
  <Button onClick={() => console.log('취소 클릭')}>취소</Button>
);
