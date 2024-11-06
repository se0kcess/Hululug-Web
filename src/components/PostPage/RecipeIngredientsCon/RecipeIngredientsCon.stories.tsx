import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import RecipeIngredientsCon from './RecipeIngredientsCon';

export default {
  title: 'Components/RecipeIngredientsCon',
  component: RecipeIngredientsCon,
  argTypes: {
    onIngredientsFilled: { action: 'ingredients filled' },
  },
} as Meta<typeof RecipeIngredientsCon>;

const Template: StoryFn<{ onIngredientsFilled: (filled: boolean) => void }> = (args) => {
  const [isFilled, setIsFilled] = useState(false);

  const handleIngredientsFilled = (filled: boolean) => {
    setIsFilled(filled);
    args.onIngredientsFilled(filled);
  };

  return (
    <div>
      <RecipeIngredientsCon onIngredientsFilled={handleIngredientsFilled} />
      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        {isFilled ? 'All ingredients are filled' : 'Ingredients are not fully filled'}
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
