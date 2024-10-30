import { Meta, StoryFn } from '@storybook/react';
import BackBtn, { BackBtnProps } from './BackBtn';

export default {
  title: 'Components/BackBtn',
  component: BackBtn,
  argTypes: {
    onClick: { action: 'clicked' },
    width: { control: { type: 'number', min: 16, max: 48, step: 1 } },
    height: { control: { type: 'number', min: 16, max: 48, step: 1 } },
    fill: { control: 'color' },
  },
} as Meta;

const Template: StoryFn<BackBtnProps> = (args) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <BackBtn {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  width: 24,
  height: 24,
  fill: '#1D2228',
};

export const Nomal = Template.bind({});
Nomal.args = {
  width: 24,
  height: 24,
  fill: '#1D2228',
};

export const Large = Template.bind({});
Large.args = {
  width: 32,
  height: 32,
  fill: '#1D2228',
};
