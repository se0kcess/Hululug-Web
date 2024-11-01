// RecipeTitleInput.stories.tsx
import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RecipeTitleInput from './RecipeTitleInput';

export default {
  title: 'Components/PostPage/RecipeTitleInput',
  component: RecipeTitleInput,
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
} as Meta<typeof RecipeTitleInput>;

const Template: StoryFn<typeof RecipeTitleInput> = (args) => {
  const [value, setValue] = useState(args.value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange(e); // Storybook action log
  };

  return <RecipeTitleInput {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: '제목을 입력하세요',
  value: '',
};
