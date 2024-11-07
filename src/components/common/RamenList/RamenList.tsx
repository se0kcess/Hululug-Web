import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import { RamenTag } from '@/components/common/RamenTag/RamenTag';
import { BookmarkButton } from '@/components/common/BookmarkButton/BookmarkButton';
import { RenderPostDate } from '@/components/common/RenderPostDate/RenderPostDate';
import { BodyText } from '@/styles/Typography';
import tagMapping from '@/constants/ramenTagMapping';
import { Recipe } from '@/types/ramenRecipe';

interface RamenListProps {
  recipes: Recipe[];
  onRecipeClick?: (id: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeCard = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  border-radius: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 110px;
  width: 130px;
  aspect-ratio: 4/3;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeartPosition = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(BodyText)`
  color: ${theme.colors.black};
  font-weight: ${theme.typography.weights.medium};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin: 0;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.gray[700]};
`;

export const RamenList = ({ recipes, onRecipeClick }: RamenListProps) => {
  return (
    <Container>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} onClick={() => onRecipeClick?.(recipe.recipe_id)}>
          <ImageContainer>
            <RecipeImage src={recipe.thumbnail || '/default-recipe-image.jpg'} alt={recipe.title} />
            <HeartPosition>
              <HeartIconContainer initialLikes={recipe.likes} recipeId={recipe.recipe_id} />
            </HeartPosition>
          </ImageContainer>
          <ContentContainer>
            <TopRow>
              <RamenTag
                ramen={{
                  id: recipe.tags[0],
                  name: tagMapping[recipe.tags[0]] || '기타',
                }}
              />
              <BookmarkButton recipeId={recipe._id} size={20} />
            </TopRow>
            <Title>{recipe.title}</Title>
            <BottomRow>
              <ProfileContainer>
                <ProfileImage
                  src={recipe.writer.profile_image || '/default-profile-image.jpg'}
                  alt={recipe.writer.nickname}
                />
                <AuthorName>{recipe.writer.nickname}</AuthorName>
              </ProfileContainer>
              <RenderPostDate date={recipe.created_at} />
            </BottomRow>
          </ContentContainer>
        </RecipeCard>
      ))}
    </Container>
  );
};
