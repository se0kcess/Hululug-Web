import { Meta, StoryFn } from '@storybook/react';
import WithdrawProfileCon from '@/components/WithdrawPage/WithdrawProfileCon/WithdrawProfileCon';

export default {
  title: 'Components/WithdrawPage/WithdrawProfileCon',
  component: WithdrawProfileCon,
} as Meta;

const Template: StoryFn = (args) => <WithdrawProfileCon {...args} />;

export const Default = Template.bind({});
Default.args = {};
