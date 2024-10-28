import { Meta, StoryFn } from '@storybook/react';
import Profile from './Profile';

export default {
  title: 'Components/Profile',
  component: Profile,
  argTypes: {
    imgSrc: { control: 'text' },
    name: { control: 'text' },
    caption: { control: 'text' },
  },
} as Meta<typeof Profile>;

const Template: StoryFn<typeof Profile> = (args) => <Profile {...args} />;

export const Default = Template.bind({});
Default.args = {
  imgSrc: '../../src/assets/images/profile-img-1.png',
  name: '백종원',
  caption: '라면왕이 되고 싶어',
};
