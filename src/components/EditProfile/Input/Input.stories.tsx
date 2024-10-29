import { Meta, StoryFn } from '@storybook/react';
import Input, { InputType } from './Input';
import theme from '@/styles/theme';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    color: { control: 'color', defaultValue: theme.colors.gray[700] },
    borderColor: { control: 'color', defaultValue: theme.colors.gray[100] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text', defaultValue: 'Enter text here' },
    type: { control: 'text', defaultValue: 'text' },
    onChange: { action: 'changed' },
    onFocus: { action: 'focused' },
  },
} as Meta<InputType>;

const Template: StoryFn<InputType> = (args) => <Input {...args} />;

export const Default = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input
      color={theme.colors.gray[700]} // 공통 색상
      disabled={false}
      value="백종원"
      placeholder="Enter your name"
      type="text"
    />
    <Input
      color={theme.colors.gray[700]} // 공통 색상
      disabled={false}
      value="라면왕이 되고 싶어"
      placeholder="Enter your email"
      type="text"
    />
    <Input
      color={theme.colors.gray[200]} // 공통 색상
      borderColor={theme.colors.red} // 개별 borderColor
      disabled={false}
      placeholder="변경할 닉네임을 입력해주세요."
      type="text"
    />
    <Input
      color={theme.colors.gray[700]} // 공통 색상
      borderColor={theme.colors.red[500]} // 개별 borderColor
      disabled={true}
      placeholder="hululug@naver.com"
      type="text"
    />
    <Input
      color={theme.colors.gray[200]} // 공통 색상
      disabled={false}
      value="간단한 자기소개를 작성해주세요."
      placeholder="Enter your email"
      type="text"
    />
  </div>
);

export const WithBorderColor = Template.bind({});
WithBorderColor.args = {
  color: theme.colors.gray[700], // 공통 색상
  borderColor: theme.colors.blue[500], // 개별 borderColor
  disabled: false,
  placeholder: 'Input with custom border color',
  type: 'text',
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  color: theme.colors.gray[700], // 공통 색상
  borderColor: theme.colors.red[500], // 개별 borderColor
  disabled: false,
  placeholder: 'Enter your password',
  type: 'password',
};
