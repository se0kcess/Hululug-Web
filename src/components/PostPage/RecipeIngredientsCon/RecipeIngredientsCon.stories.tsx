import { Meta, StoryFn } from '@storybook/react';
import RecipeIngredientsCon, { RecipeIngredientsConProps } from './RecipeIngredientsCon';

export default {
  title: 'Components/RecipeIngredientsCon',
  component: RecipeIngredientsCon,
  argTypes: {
    onIngredientsFilled: { action: 'onIngredientsFilled' },
    onIngredientChange: { action: 'onIngredientChange' },
  },
} as Meta;

const Template: StoryFn<RecipeIngredientsConProps> = (args) => <RecipeIngredientsCon {...args} />;

export const Default = Template.bind({});
Default.args = {
  ingredients: [{ name: '', quantity: '' }],
};

export const FilledIngredients = Template.bind({});
FilledIngredients.args = {
  ingredients: [
    { name: 'Tomato', quantity: '2 pcs' },
    { name: 'Onion', quantity: '1 pc' },
  ],
};
