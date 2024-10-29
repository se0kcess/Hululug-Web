import { Meta, StoryFn } from '@storybook/react';
import DeleteCommentModal from './DeleteCommentModal';

export default {
  title: 'Components/DeleteCommentModal',
  component: DeleteCommentModal,
  argTypes: {
    onCancel: { action: '취소' },
    onDelete: { action: '삭제' },
  },
} as Meta<typeof DeleteCommentModal>;

const Template: StoryFn<typeof DeleteCommentModal> = (args) => <DeleteCommentModal {...args} />;

export const Default = Template.bind({});
Default.args = {};
