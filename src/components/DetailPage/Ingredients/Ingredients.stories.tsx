import { Meta, StoryFn } from '@storybook/react';
import Ingredients from './Ingredients';

export default {
  title: 'Components/DetailPage/Ingredients',
  component: Ingredients,
  argTypes: {
    title: { control: 'text' },
    ingredientData: { control: 'object' },
  },
} as Meta<typeof Ingredients>;

const Template: StoryFn<typeof Ingredients> = (args) => <Ingredients {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '재료',
  ingredientData: [
    { name: '라면', amount: '1개' },
    { name: '대파', amount: '1/3대' },
    { name: '물', amount: '1.5컵' },
    { name: '황설탕', amount: '1T' },
    { name: '고추장', amount: '1T' },
  ],
};
