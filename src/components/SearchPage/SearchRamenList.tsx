import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import { BookmarkButton } from '@/components/common/BookmarkButton/BookmarkButton';
import { RenderPostDate } from '@/components/common/RenderPostDate/RenderPostDate';
import { BodyText, CaptionText } from '@/styles/Typography';
import tagMapping from '@/constants/ramenTagMapping';
import { useNavigate } from 'react-router-dom';

export interface RamenRecipe {
  _id: string;
  recipe_id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  likes: number;
  created_at: string;
  writer: {
    nickname: string;
    profile_image: string;
  };
}

interface SearchRamenListProps {
  recipes: RamenRecipe[];
  onRecipeClick?: (id: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  border-bottom: 1px solid ${theme.colors.gray[50]};
  box-sizing: border-box;
`;

const RecipeCard = styled.div`
  display: flex;
  gap: 1rem;
  background: ${theme.colors.white};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100px;
  width: 130px;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeartPosition = styled.div`
  position: absolute;
  left: 5px;
  bottom: 0;
  z-index: 1;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const Title = styled(BodyText)`
  color: ${theme.colors.gray[700]};
  font-size: 18px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 5px;
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
  gap: 6px;
`;

const ProfileImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

const AuthorName = styled(CaptionText)`
  color: ${theme.colors.gray[700]};
`;

const SearchRamenList = ({ recipes }: SearchRamenListProps) => {
  const navigate = useNavigate();

  return (
    <Container>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.recipe_id} onClick={() => navigate(`/details/${recipe.recipe_id}`)}>
          <ImageContainer>
            <RecipeImage src={recipe.thumbnail} alt={recipe.title} />
            <HeartPosition>
              <HeartIconContainer initialLikes={recipe.likes} recipeId={recipe.recipe_id} />
            </HeartPosition>
          </ImageContainer>
          <ContentContainer>
            <TopRow>
              {recipe.tags.slice(0, 2).map((tag, index) => (
                <Tag key={index}>{tagMapping[tag] || 'Unknown Tag'}</Tag>
              ))}

              <BookmarkButton recipeId={recipe.recipe_id} size={24} />
            </TopRow>
            <Title>{recipe.title}</Title>
            <BottomRow>
              <RenderPostDate date={recipe.created_at} />
              <ProfileContainer>
                <AuthorName>{recipe.writer.nickname}</AuthorName>
                <ProfileImage src={recipe.writer.profile_image} alt={recipe.writer.nickname} />
              </ProfileContainer>
            </BottomRow>
          </ContentContainer>
        </RecipeCard>
      ))}
    </Container>
  );
};

export default SearchRamenList;
