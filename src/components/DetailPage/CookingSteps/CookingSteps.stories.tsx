import { Meta, StoryFn } from '@storybook/react';
import CookingSteps, { Title } from './CookingSteps';

export default {
  title: 'Components/CookingSteps',
  component: CookingSteps,
  argTypes: {
    steps: { control: 'object' }, // Controls 패널에서 steps 배열을 변경 가능하도록 설정
  },
} as Meta<typeof CookingSteps>;

const Template: StoryFn<typeof CookingSteps> = (args) => <CookingSteps {...args} />;

export const Default = Template.bind({});
Default.args = {
  steps: [
    { number: 1, description: '대파는 송송 썰어 준비한다.' },
    {
      number: 2,
      description: '냄비에 물, 분말스프(1/2~2/3), 건더기스프, 설탕, 고추장을 넣고 풀어주며 끓인다.',
    },
    { number: 3, description: '육수가 끓으면 면을 넣고 끓인다.' },
    { number: 4, description: '면이 완전히 풀어지면 대파를 넣고 1분 정도 더 끓인다.' },
    { number: 5, description: '물이 줄어들고 면이 익으면 불을 끄고 그릇에 담아 완성한다.' },
  ],
};

export const TitleStory: StoryFn = () => (
  <>
    <Title text={'조리순서'} />
  </>
);

// CookingSteps에 단일 단계만 포함한 스토리
export const SingleStep: StoryFn<typeof CookingSteps> = (args) => <CookingSteps {...args} />;
SingleStep.args = {
  steps: [{ number: 1, description: '대파는 송송 썰어 준비한다.' }],
};
