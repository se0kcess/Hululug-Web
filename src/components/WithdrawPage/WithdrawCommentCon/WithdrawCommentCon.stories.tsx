import { Meta, StoryFn } from '@storybook/react';
import WithdrawCommentCon from '@/components/WithdrawPage/WithdrawCommentCon/WithdrawCommentCon';

export default {
  title: 'Components/WithdrawPage/WithdrawCommentCon',
  component: WithdrawCommentCon,
} as Meta;

const Template: StoryFn = (args) => <WithdrawCommentCon {...args} />;

export const Default = Template.bind({});
Default.args = {};
