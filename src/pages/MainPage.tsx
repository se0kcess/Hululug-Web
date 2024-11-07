// pages/MainPage.tsx
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { getRecipes } from '@/api/recipes';
import { useFilterStore } from '@/store/filterStore';
import Footer from '@/components/common/Footer/Footer';
import BannerSlider from '@/components/MainPage/Banner/BannerSlider';
import { FilterButtons } from '@/components/MainPage/FilterButtons/FilterButtons';
import Header from '@/components/MainPage/Header/Header';
import { Title1 } from '@/styles/Typography';
import { SortOption } from '@/types/sort';
import { Recipe } from '@/types/ramenRecipe';
import { RamenList } from '@/components/common/RamenList/RamenList';
import { HotRecipeCard } from '@/components/MainPage/HotRecipeCard/HotRecipeCard';
import { LoadingSpinner } from '@/components/common/LoadingSpinner/LoadingSpinner';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  padding-bottom: 5rem;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
`;

const SectionTitle = styled(Title1)`
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

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.red};
`;

const RetryButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.primaryMain};
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default function MainPage() {
  const navigate = useNavigate();
  const { tagId, sort, setTagId, setSort } = useFilterStore();

  const [hotRecipes, setHotRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [isLoadingHot, setIsLoadingHot] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 인기 레시피 불러오기
  const fetchHotRecipes = async () => {
    try {
      setIsLoadingHot(true);
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
      setIsLoadingHot(false);
    }
  };

  // 전체 레시피 불러오기
  const fetchAllRecipes = async (resetList: boolean = false) => {
    try {
      setIsLoadingAll(true);
      setError(null);

      const params = {
        sort,
        limit: 8,
        ...(tagId && { tag: tagId }),
        ...(cursor && !resetList && { cursor }),
      };

      const response = await getRecipes(params);

      if (resetList) {
        setAllRecipes(response.data.recipes);
      } else {
        setAllRecipes((prev) => [...prev, ...response.data.recipes]);
      }

      setCursor(response.data.next_cursor);
    } catch (err) {
      setError('레시피를 불러오는데 실패했습니다.');
      console.error('Failed to fetch recipes:', err);
    } finally {
      setIsLoadingAll(false);
    }
  };

  // 초기 로딩
  useEffect(() => {
    fetchHotRecipes();
  }, []);

  // 필터 변경시 레시피 리스트 재로딩
  useEffect(() => {
    setCursor(null);
    fetchAllRecipes(true);
  }, [tagId, sort]);

  // 무한 스크롤 구현
  useEffect(() => {
    const handleScroll = () => {
      if (isLoadingAll || !cursor) return;

      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 1000) {
        fetchAllRecipes();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cursor, isLoadingAll]);

  const handleRecipeClick = useCallback(
    (recipeId: string) => {
      navigate(`/details/${recipeId}`);
    },
    [navigate],
  );

  const handleTagSelect = useCallback(
    (newTagId: string | undefined) => {
      setTagId(newTagId);
    },
    [setTagId],
  );

  const handleSortChange = useCallback(
    (newSort: SortOption) => {
      setSort(newSort);
    },
    [setSort],
  );

  if (error) {
    return (
      <ErrorContainer>
        <p>{error}</p>
        <RetryButton
          onClick={() => {
            fetchHotRecipes();
            fetchAllRecipes(true);
          }}
        >
          다시 시도하기
        </RetryButton>
      </ErrorContainer>
    );
  }

  return (
    <>
      <Header />
      <Container>
        <BannerSlider />

        {/* 인기 레시피 섹션 */}
        <SectionTitle>인기있는 레시피</SectionTitle>
        <RecipeRow>
          {isLoadingHot ? (
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

        {/* 전체 레시피 섹션 */}
        <SectionTitle>모든 레시피</SectionTitle>
        <FilterButtons onTagSelect={handleTagSelect} onSortChange={handleSortChange} />

        {isLoadingAll && allRecipes.length === 0 ? (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        ) : (
          <>
            <RamenList recipes={allRecipes} onRecipeClick={handleRecipeClick} />
            {isLoadingAll && (
              <LoadingContainer>
                <LoadingSpinner />
              </LoadingContainer>
            )}
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
