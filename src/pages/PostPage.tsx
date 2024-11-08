import useRecipeStore from '@/store/recipeStore';
import PostPageHeader from '@/components/PostPage/PostPageHeader/PostPageHeader';
import RecipeIntroduction from '@/components/PostPage/RecipeIntroduction';
import RecipeIngredients from '@/components/PostPage/RecipeIngredients';
import RecipeSteps from '@/components/PostPage/RecipeSteps';
import styled from '@emotion/styled';
import RecipeTab from '@/components/PostPage/RecipeTab/RecipeTab';

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh);
  padding: 0 24px 24px 24px;
`;

const PostPage = () => {
  const { activeTab, setActiveTab } = useRecipeStore();

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
};

export default PostPage;
