import { Meta, StoryFn } from '@storybook/react';
import CheckBox, { CheckBoxProps } from '@/components/WithdrawPage/CheckBox/CheckBox'; // 경로는 프로젝트에 맞게 수정하세요.

export default {
  title: 'Components/WithdrawPage/CheckBox', // Storybook의 경로 설정
  component: CheckBox,
} as Meta<CheckBoxProps>;

const Template: StoryFn<CheckBoxProps> = (args) => <CheckBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  checked: false,
};

export const Active = Template.bind({});
Active.args = {
  checked: true,
};
