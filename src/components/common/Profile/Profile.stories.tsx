import { Meta, StoryFn } from '@storybook/react';
import Profile, { ProfileImg, Name, Caption } from './Profile';
import Img1 from '@/assets/images/profile-img-2.png';
import Img2 from '@/assets/images/profile-img-3.png';
import Img3 from '@/assets/images/profile-img-4.png';
export default {
  title: 'Components/DetailPage/Profile',
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

export const ProfileImg1: StoryFn = () => (
  <div style={{ display: 'flex', gap: '12px' }}>
    <ProfileImg src={Img1} />
    <ProfileImg src={Img2} />
    <ProfileImg src={Img3} />
  </div>
);

export const Names: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '18px' }}>
    <Name>홍길동</Name>
    <Name>슈퍼라면</Name>
    <Name>내가만든라면</Name>
  </div>
);

export const Captions: StoryFn = () => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '18px' }}>
    <Caption>라면왕이 되고 싶어</Caption>
    <Caption>이구역짱</Caption>
    <Caption>내가요리사라면</Caption>
  </div>
);
