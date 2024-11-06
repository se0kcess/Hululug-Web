// CookingStepsCon.stories.tsx
import { Meta, StoryFn } from '@storybook/react';
import CookingStepsCon from './CookingStepsCon';
import { useState } from 'react';

export default {
  title: 'Components/CookingStepsCon',
  component: CookingStepsCon,
  argTypes: {
    steps: {
      control: {
        type: 'object', // 'array' 대신 'object'를 사용하여 제어 타입을 설정
      },
      defaultValue: [''],
    },
    onStepChange: { action: 'Step changed' },
    onAddStep: { action: 'Step added' },
  },
} as Meta<typeof CookingStepsCon>;

const Template: StoryFn<typeof CookingStepsCon> = (args) => {
  const [steps, setSteps] = useState(args.steps || ['']);

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
    args.onStepChange(index, value); // 스토리북 액션 호출
  };

  const handleAddStep = () => {
    const newSteps = [...steps, ''];
    setSteps(newSteps);
    args.onAddStep(); // 스토리북 액션 호출
  };

  return (
    <CookingStepsCon steps={steps} onStepChange={handleStepChange} onAddStep={handleAddStep} />
  );
};

export const Default = Template.bind({});
Default.args = {
  steps: [''],
};
