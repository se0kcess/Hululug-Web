import styled from '@emotion/styled';
import { RamenType } from '@/types/ramen';
import theme from '@/styles/theme';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import { RamenTag } from '@/components/common/RamenTag/RamenTag';
import { BookmarkButton } from '@/components/common/BookmarkButton/BookmarkButton';
import { RenderPostDate } from '@/components/common/RenderPostDate/RenderPostDate';
import { Title2 } from '@/styles/Typography';

export interface RamenRecipe {
  id: string;
  title: string;
  author: string;
  authorImage: string;
  likes: number;
  date: string;
  image: string;
  ramenType: RamenType;
  bookmarkId: string;
}

interface RamenListProps {
  recipes: RamenRecipe[];
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
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100px;
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
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Title2)`
  color: ${theme.colors.black};
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
`;

const AuthorName = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.gray[700]};
`;

const RamenList = ({ recipes, onRecipeClick }: RamenListProps) => {
  return (
    <Container>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} onClick={() => onRecipeClick?.(recipe.id)}>
          <ImageContainer>
            <RecipeImage src={recipe.image} alt={recipe.title} />
            <HeartPosition>
              <HeartIconContainer initialLikes={recipe.likes} recipeId={recipe.id} />
            </HeartPosition>
          </ImageContainer>
          <ContentContainer>
            <TopRow>
              <RamenTag ramen={recipe.ramenType} />
              <BookmarkButton recipeId={recipe.bookmarkId} size={20} />
            </TopRow>
            <Title>{recipe.title}</Title>
            <BottomRow>
              <ProfileContainer>
                <ProfileImage src={recipe.authorImage} alt={recipe.author} />
                <AuthorName>{recipe.author}</AuthorName>
              </ProfileContainer>
              <RenderPostDate date={recipe.date} />
            </BottomRow>
          </ContentContainer>
        </RecipeCard>
      ))}
    </Container>
  );
};

export default RamenList;
