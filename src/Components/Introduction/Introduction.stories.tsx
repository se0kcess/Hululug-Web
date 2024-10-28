import { Meta, StoryFn } from '@storybook/react';
import Introduction from './Introduction';

export default {
  title: 'Components/Introduction',
  component: Introduction,
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
  },
} as Meta<typeof Introduction>;

const Template: StoryFn<typeof Introduction> = (args) => <Introduction {...args} />;

export const Intro = Template.bind({});
Intro.args = {
  title: '초간단 1분 라볶이',
  content: '분식집 차려도 될 만큼 맛있는 라볶이 황금 비율 양념장은 추억의 바로 그 맛!',
};
