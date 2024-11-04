// WithdrawHeader.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import WithdrawHeader from '@/components/WithdrawPage/WithdrawHeader/WithdrawHeader';

export default {
  title: 'Components/WithdrawPage/WithdrawHeader',
  component: WithdrawHeader,
} as Meta;

const Template: StoryFn = () => <WithdrawHeader />;

export const Default = Template.bind({});
Default.args = {};
