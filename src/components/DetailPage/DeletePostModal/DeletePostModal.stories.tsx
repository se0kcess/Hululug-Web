import { Meta, StoryFn } from '@storybook/react';
import DeletePostModal, { DeletePostModalProps } from './DeletePostModal';

// Meta configuration for Storybook
export default {
  title: 'Components/DetailPage/DeletePostModal',
  component: DeletePostModal,
} as Meta<DeletePostModalProps>;

// Template for the modal
const Template: StoryFn<DeletePostModalProps> = (args) => <DeletePostModal {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  onCancel: () => alert('취소 버튼 클릭됨'),
  onDelete: () => alert('삭제 버튼 클릭됨'),
};
