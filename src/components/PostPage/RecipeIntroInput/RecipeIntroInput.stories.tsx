import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RecipeIntroInput from './RecipeIntroInput';

export default {
  title: 'Components/PostPage/RecipeIntroInput',
  component: RecipeIntroInput,
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} as Meta<typeof RecipeIntroInput>;

const Template: StoryFn<typeof RecipeIntroInput> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return (
    <RecipeIntroInput
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        args.onChange(e);
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  value: '레시피에 대한 간단한 소개를 입력해주세요.',
};
