import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipes } from '@/api/recipes';
import Footer from '@/components/common/Footer/Footer';
import BannerSlider from '@/components/MainPage/Banner/BannerSlider';
import { FilterButtons } from '@/components/MainPage/FilterButtons/FilterButtons';
import Header from '@/components/MainPage/Header/Header';
import { Title1 } from '@/styles/Typography';
import styled from '@emotion/styled';
import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner';
import { Recipe } from '@/types/ramenRecipe';
import { RamenList } from '@/components/common/RamenList/RamenList';
import { useRamenFilterStore, useSortStore } from '@/store/filterStore';
import { HotRecipeCard } from '@/components/MainPage/HotRecipeCard/HotRecipeCard';
import { SortOption } from '@/types/sort';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding-bottom: 5rem;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
`;

const RecipeTitle = styled(Title1)`
  padding: 1rem 0;
`;

const RecipeRow = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0.5rem 0;
`;

const RecipeCard = styled.div`
  flex: 0 0 auto;
  width: calc(70% - 1.2rem);
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

export default function MainPage() {
  const navigate = useNavigate();
  const [hotRecipes, setHotRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Zustand store에서 필터 상태 가져오기
  const { tagId, setTagId } = useRamenFilterStore();
  const { sort, setSort } = useSortStore();

  // 인기 레시피 불러오기
  const fetchHotRecipes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getRecipes({
        sort: 'popular',
        limit: 3,
      });
      setHotRecipes(response.data.recipes);
    } catch (err) {
      setError('인기 레시피를 불러오는데 실패했습니다.');
      console.error('Failed to fetch hot recipes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 로딩
  useEffect(() => {
    fetchHotRecipes();
  }, []);

  // 레시피 클릭 핸들러
  const handleRecipeClick = (recipeId: string) => {
    navigate(`/details/${recipeId}`);
  };

  // 필터 변경 핸들러
  const handleTagSelect = (newTagId: string | undefined) => {
    setTagId(newTagId);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
  };

  return (
    <>
      <Header />
      <Container>
        <BannerSlider />
        <RecipeTitle>인기있는 레시피</RecipeTitle>
        <RecipeRow>
          {isLoading ? (
            <LoadingContainer>
              <LoadingSpinner />
            </LoadingContainer>
          ) : (
            hotRecipes.map((recipe) => (
              <RecipeCard key={recipe._id}>
                <HotRecipeCard {...recipe} onClick={() => handleRecipeClick(recipe.recipe_id)} />
              </RecipeCard>
            ))
          )}
        </RecipeRow>
        <RecipeTitle>모든 레시피</RecipeTitle>
        <FilterButtons onTagSelect={handleTagSelect} onSortChange={handleSortChange} />
        <RamenList selectedTag={tagId} sort={sort} onRecipeClick={handleRecipeClick} />
      </Container>
      <Footer />
    </>
  );
}
