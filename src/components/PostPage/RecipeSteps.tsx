import useRecipeStore from '@/store/recipeStore';
import CookingStepsCon from '@/components/PostPage/CookingStepsCon/CookingStepsCon';
import CompletedBtnCon from '@/components/PostPage/CompletedBtnCon/CompletedBtnCon';
import styled from '@emotion/styled';

const BtnCon = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 24px;
`;

interface RecipeStepsProps {
  onPrev: () => void;
}

const RecipeSteps = ({ onPrev }: RecipeStepsProps) => {
  const { steps, setStep, addStep } = useRecipeStore();

  const handleStepChange = (index: number, value: string) => {
    setStep(index, value);
  };

  const isCompletedEnabled = steps.every((step) => step.trim() !== '');

  return (
    <>
      <CookingStepsCon steps={steps} onStepChange={handleStepChange} onAddStep={addStep} />
      <BtnCon>
        <CompletedBtnCon isActive={isCompletedEnabled} onPrev={onPrev} />
      </BtnCon>
    </>
  );
};

export default RecipeSteps;
