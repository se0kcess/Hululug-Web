import { useState } from 'react';
import styled from '@emotion/styled';
import PostPageHeader from '@/components/PostPage/PostPageHeader/PostPageHeader';
import RecipeTab from '@/components/PostPage/RecipeTab/RecipeTab';
import PostPageImgCon from '@/components/PostPage/PostPageImgCon/PostPageImgCon';
import RecipeTitleInput from '@/components/PostPage/RecipeTitleInput/RecipeTitleInput';
import RecipeIntroInput from '@/components/PostPage/RecipeIntroInput/RecipeIntroInput';
import NextBtn from '@/components/PostPage/NextBtn/NextBtn';
import RamenTypeSelect from '@/components/PostPage/RamenTypeSelect/RamenTypeSelect';
import RecipeIngredientsCon from '@/components/PostPage/RecipeIngredientsCon/RecipeIngredientsCon';
import IngredientsNextBtn from '@/components/PostPage/IngredientsNextBtn/IngredientsNextBtn';
import CookingStepsCon from '@/components/PostPage/CookingStepsCon/CookingStepsCon';
import CompletedBtnCon from '@/components/PostPage/CompletedBtnCon/CompletedBtnCon';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh);
  padding: 0 24px 24px 24px;
`;

const BtnCon = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 24px;
`;

const RecipeIntroduction = ({ onNext }: { onNext: () => void }) => {
  const [imgAdded, setImgAdded] = useState(false);
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');

  const isNextEnabled = imgAdded && title.trim() !== '' && intro.trim() !== '';

  return (
    <>
      <PostPageImgCon onImageAdd={() => setImgAdded(true)} />
      <RecipeTitleInput value={title} onChange={(e) => setTitle(e.target.value)} />
      <RecipeIntroInput value={intro} onChange={(e) => setIntro(e.target.value)} />
      <BtnCon>
        <NextBtn isActive={isNextEnabled} onClick={isNextEnabled ? onNext : undefined} />
      </BtnCon>
    </>
  );
};

const RecipeIngredients = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
  const [ramenSelected, setRamenSelected] = useState(false);
  const [ingredientsFilled, setIngredientsFilled] = useState(false);

  const isNextEnabled = ramenSelected && ingredientsFilled;

  return (
    <>
      <RamenTypeSelect
        onDisSelect={() => setRamenSelected(false)}
        onSelect={() => setRamenSelected(true)}
      />
      <RecipeIngredientsCon onIngredientsFilled={(filled) => setIngredientsFilled(filled)} />
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

const RecipeSteps = ({ onPrev }: { onPrev: () => void }) => {
  const [steps, setSteps] = useState(['']);
  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const isCompletedEnabled = steps.every((step) => step.trim() !== '');

  return (
    <>
      <CookingStepsCon steps={steps} onStepChange={handleStepChange} onAddStep={handleAddStep} />
      <BtnCon>
        <CompletedBtnCon isActive={isCompletedEnabled} onPrev={onPrev} />
      </BtnCon>
    </>
  );
};

export default function PostPage() {
  const [activeTab, setActiveTab] = useState('레시피 소개');

  const handleNextTab = () => {
    if (activeTab === '레시피 소개') {
      setActiveTab('레시피 재료');
    } else if (activeTab === '레시피 재료') {
      setActiveTab('레시피 순서');
    }
  };

  const handlePrevTab = () => {
    if (activeTab === '레시피 재료') {
      setActiveTab('레시피 소개');
    } else if (activeTab === '레시피 순서') {
      setActiveTab('레시피 재료');
    }
  };

  return (
    <Container>
      <PostPageHeader />
      <RecipeTab activeTab={activeTab} onTabChange={() => {}} />

      {activeTab === '레시피 소개' && <RecipeIntroduction onNext={handleNextTab} />}
      {activeTab === '레시피 재료' && (
        <RecipeIngredients onNext={handleNextTab} onPrev={handlePrevTab} />
      )}
      {activeTab === '레시피 순서' && <RecipeSteps onPrev={handlePrevTab} />}
    </Container>
  );
}
