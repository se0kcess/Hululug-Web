import useRecipeStore from '@/store/recipeStore';
import styled from '@emotion/styled';
import RamenTypeSelect from '@/components/PostPage/RamenTypeSelect/RamenTypeSelect';
import RecipeIngredientsCon from '@/components/PostPage/RecipeIngredientsCon/RecipeIngredientsCon';
import IngredientsNextBtn from '@/components/PostPage/IngredientsNextBtn/IngredientsNextBtn';
import { useCallback } from 'react';

const BtnCon = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 24px;
`;

interface RecipeIngredientsProps {
  onNext: () => void;
  onPrev: () => void;
}

const RecipeIngredients = ({ onNext, onPrev }: RecipeIngredientsProps) => {
  const { ramenSelected, ingredients, ingredientsFilled, setIngredientsFilled, updateIngredient } =
    useRecipeStore();

  const handleIngredientsFilled = useCallback(
    (filled: boolean) => {
      if (ingredientsFilled !== filled) {
        setIngredientsFilled(filled);
      }
    },
    [ingredientsFilled, setIngredientsFilled],
  );

  const handleIngredientChange = (index: number, name: string, quantity: string) => {
    updateIngredient(index, { name, quantity });
  };

  const isNextEnabled = ramenSelected && ingredientsFilled;

  return (
    <>
      {/* onDisSelect와 onSelect props 제거 */}
      <RamenTypeSelect />
      <RecipeIngredientsCon
        ingredients={ingredients}
        onIngredientsFilled={handleIngredientsFilled}
        onIngredientChange={handleIngredientChange}
      />
      <BtnCon>
        <IngredientsNextBtn
          isActive={isNextEnabled}
          onNextClick={isNextEnabled ? onNext : undefined}
          onPrevClick={onPrev}
        />
      </BtnCon>
    </>
  );
};

export default RecipeIngredients;
