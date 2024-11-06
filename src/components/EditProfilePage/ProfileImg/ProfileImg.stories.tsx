import { Meta, StoryFn } from '@storybook/react';
import Plus from '@/assets/icons/Plus';
import ProfileImg, { ProfileImgCon, ProfilePlusBtn } from './ProfileImg';

import basicImg1 from '@/assets/images/profile-img-2.png';
import basicImg2 from '@/assets/images/profile-img-3.png';
import basicImg3 from '@/assets/images/profile-img-4.png';

import theme from '@/styles/theme';

export default {
  title: 'Components/EditProfile/ProfileImg',
  component: ProfileImg,
} as Meta;

const Template: StoryFn = () => <ProfileImg ImgSrc={basicImg1} />;

export const Default = Template.bind({});
Default.storyName = 'Profile Image';

export const ProfileImg1: StoryFn = () => (
  <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
    <ProfileImgCon ImgSrc={basicImg1} />
    <ProfileImgCon ImgSrc={basicImg2} />
    <ProfileImgCon ImgSrc={basicImg3} />
  </div>
);

export const PlusBtn: StoryFn = () => (
  <ProfilePlusBtn style={{ position: 'relative' }}>
    <Plus width={24} height={24} fill={theme.colors.white} />
  </ProfilePlusBtn>
);
