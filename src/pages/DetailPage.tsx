import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { useRecipeDetail } from '@/hooks/useRecipeDetail';
import useRecipeDetailStore from '@/store/recipeDetailStore';
import MainImg from '@/components/DetailPage/MainImg/MainImg';
import { RamenTag } from '@/components/common/RamenTag/RamenTag';
import { RenderPostDate } from '@/components/common/RenderPostDate/RenderPostDate';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import Introduction from '@/components/DetailPage/Introduction/Introduction';
import Profile from '@/components/common/Profile/Profile';
import Ingredients from '@/components/DetailPage/Ingredients/Ingredients';
import CookingSteps from '@/components/DetailPage/CookingSteps/CookingSteps';
import CommentInput from '@/components/DetailPage/CommentInput/CommentInput';
import Comments from '@/components/DetailPage/Comments/Comments';
import DeletePostModal from '@/components/DetailPage/DeletePostModal/DeletePostModal';
import { ActionBar } from '@/components/DetailPage/ActionBar/ActionBar';
import theme from '@/styles/theme';
import BackButton from '@/components/common/BackButton/BackButton';
import Clear from '@/assets/icons/Clear';
import Pencil from '@/assets/icons/Pencil';
import tagMapping from '@/constants/ramenTagMapping';

const Container = styled.div`
  margin: 0;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 60px);
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 24px;
  left: 18px;
  cursor: pointer;
`;

const IntroSec = styled.div`
  width: 100%;
  padding: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TagDateLike = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const IngredientsCon = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentInputCon = styled.div`
  width: 100%;
  padding: 24px 24px 0 24px;
  display: flex;
  flex-direction: column;
`;

const CommentSec = styled.div`
  width: 100%;
  padding: 12px 24px 24px 24px;
`;

const ActionBarCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid ${theme.colors.gray[50]};
  background-color: ${theme.colors.white};
  position: sticky;
  bottom: 0;
`;

const EditCon = styled.div`
  display: flex;
  gap: 8px;
  position: absolute;
  right: 0;
  top: 16px;
`;

const EditBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;

const PostDeleteBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;
const Tag = styled.div`
  max-width: 100px;
  max-height: 28px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.primaryPastel};
  color: ${theme.colors.primaryMain};
  border-radius: 100px;
  padding: 4px 12px;
`;

export default function DetailPage() {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data: recipe, isLoading, error, isSuccess } = useRecipeDetail(recipeId!);
  const storedRecipe = useRecipeDetailStore((state) => state.recipe);
  const setRecipe = useRecipeDetailStore((state) => state.setRecipe);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const isLoggedIn = false;
  const commentSecRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSuccess && recipe) {
      setRecipe(recipe);
    }
  }, [isSuccess, recipe, setRecipe]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !storedRecipe) return <div>Error: {error?.message || 'Recipe not found'}</div>;

  const ramenTag = {
    name: tagMapping[storedRecipe.tags[0]] || '알 수 없음',
  };

  const handleDelete = async () => {
    console.log('게시글 삭제버튼 클릭.');
    try {
      const response = await fetch(`/recipes/${recipeId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Recipe deleted:', data.message);
      } else {
        console.error('Failed to delete the recipe:', data.message);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Container>
        <BackButtonContainer>
          <BackButton width={32} height={32} fill={theme.colors.white} />
        </BackButtonContainer>
        <MainImg imgSrc={storedRecipe.thumbnail} />
        <IntroSec>
          <TagDateLike>
            {storedRecipe.tags.slice(0, 2).map((tag, index) => (
              <Tag key={index}>{tagMapping[tag] || 'Unknown Tag'}</Tag>
            ))}
            <div style={{ display: 'flex', gap: 8 }}>
              <RenderPostDate date={new Date(storedRecipe.created_at).toLocaleDateString()} />
              <HeartIconContainer
                activeColor={theme.colors.gray[500]}
                inactiveColor={theme.colors.gray[500]}
                likeCountColor={theme.colors.gray[500]}
                initialLikes={storedRecipe.likes}
                recipeId={storedRecipe._id}
              />
            </div>
          </TagDateLike>
          <div style={{ position: 'relative' }}>
            <Introduction title={storedRecipe.title} content={storedRecipe.introduce} />
            {isLoggedIn && (
              <EditCon>
                <EditBtn onClick={() => console.log('Edit clicked')}>
                  <Pencil width={24} height={24} fill={theme.colors.gray[200]} />
                </EditBtn>
                <PostDeleteBtn onClick={() => setDeleteModalOpen(true)}>
                  <Clear width={24} height={24} fill={theme.colors.gray[200]} />
                </PostDeleteBtn>
              </EditCon>
            )}
          </div>
          <hr style={{ border: `1px solid ${theme.colors.gray[100]}` }} />
          <Profile
            imgSrc={storedRecipe.writer.profile_image}
            name={storedRecipe.writer.nickname}
            caption={storedRecipe.writer.introduce}
          />
        </IntroSec>
        <hr
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: theme.colors.gray[50],
            border: 'none',
          }}
        />
        <IngredientsCon>
          <Ingredients
            title="재료"
            ingredientData={storedRecipe.ingredients.map((ing) => ({
              name: ing.name,
              amount: ing.unit,
            }))}
          />
          <CookingSteps
            steps={storedRecipe.cooking_steps.map((desc, index) => ({
              number: index + 1,
              description: desc,
            }))}
          />
        </IngredientsCon>
        <hr
          style={{
            width: '100%',
            height: '8px',
            backgroundColor: theme.colors.gray[50],
            border: 'none',
          }}
        />
        <CommentInputCon>
          <CommentInput
            recipeId={parseInt(storedRecipe._id)}
            isLoggedIn={true}
            onCommentAdded={(content) => console.log(content)}
          />
        </CommentInputCon>
        <CommentSec ref={commentSecRef}>
          <Comments
            comments={[]}
            recipeId={parseInt(storedRecipe._id)}
            onCommentsUpdate={(updatedComments) => console.log('comments updated', updatedComments)}
          />
        </CommentSec>
        <ActionBarCon>
          <ActionBar
            likes={storedRecipe.likes}
            comments={0}
            recipeId={storedRecipe._id}
            onLike={() => console.log('Liked!')}
            onComment={() => console.log('Commented!')}
            onBookmark={() => console.log('Bookmarked!')}
            onShare={() => console.log('Shared!')}
          />
        </ActionBarCon>
        {isDeleteModalOpen && (
          <DeletePostModal onCancel={() => setDeleteModalOpen(false)} onDelete={handleDelete} />
        )}
      </Container>
    </>
  );
}
