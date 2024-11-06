import { Meta, StoryFn } from '@storybook/react';
import SubmitBtn from './SubmitBtn';
import theme from '@/styles/theme';

export default {
  title: 'Components/EditProfile/SubmitBtn',
  component: SubmitBtn,
  argTypes: {
    backgroundColor: { control: 'color', defaultValue: theme.colors.primaryMain },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof SubmitBtn>;

const Template: StoryFn<typeof SubmitBtn> = (args) => (
  <div style={{ display: 'flex', width: '200px' }}>
    <SubmitBtn {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  backgroundColor: theme.colors.primaryMain,
};

export const Active = Template.bind({});
Active.args = {
  backgroundColor: theme.colors.primaryMain,
};

export const Inactive = Template.bind({});
Inactive.args = {
  backgroundColor: theme.colors.gray[100],
};
