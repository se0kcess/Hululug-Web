import { Meta, StoryFn } from '@storybook/react';
import Introduction from './Introduction';

export default {
  title: 'Components/DetailPage/Introduction',
  component: Introduction,
  argTypes: {
    title: { control: 'text', defaultValue: '라볶이 소개' },
    content: {
      control: 'text',
      defaultValue: '분식집 차려도 될 만큼 맛있는 라볶이 황금 비율 양념장은 추억의 바로 그 맛!',
    },
  },
} as Meta<typeof Introduction>;

const Template: StoryFn<typeof Introduction> = (args) => <Introduction {...args} />;

// 기본 스토리
export const Commnet1 = Template.bind({});
Commnet1.args = {
  title: '라볶이 소개',
  content: '분식집 차려도 될 만큼 맛있는 라볶이 황금 비율 양념장은 추억의 바로 그 맛!',
};

export const Commnet2 = Template.bind({});
Commnet2.args = {
  title: '',
  content: '분식집 차려도 될 만큼 맛있는 라볶이 황금 비율 양념장은 추억의 바로 그 맛!',
};

export const Commnet3 = Template.bind({});
Commnet3.args = {
  title: '라볶이 소개',
  content: '',
};

export const Commnet4 = Template.bind({});
Commnet4.args = {
  title: '',
  content: '',
};
