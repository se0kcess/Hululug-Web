import { Meta, StoryFn } from '@storybook/react';
import MainImg from './MainImg';

export default {
  title: 'Components/DetailPage/MainImg',
  component: MainImg,
  argTypes: {
    imgSrc: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
} as Meta<typeof MainImg>;

const Template: StoryFn<typeof MainImg> = (args) => <MainImg {...args} />;

export const Img = Template.bind({});
Img.args = {
  imgSrc: '../../src/assets/ramyun-images/sample-1.png', // 이미지 경로 설정
  width: '375px', // 너비
  height: '282px', // 높이
};
