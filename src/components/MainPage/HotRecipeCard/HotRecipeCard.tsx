import styled from '@emotion/styled';
import { BodyText, Title2 } from '@/styles/Typography';
import theme from '@/styles/theme';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import { RamenRecipe } from '@/types/ramenRecipe';

interface HotRecipeCardProps extends RamenRecipe {
  onClick?: () => void;
}

const Container = styled.div`
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
`;

const StyledTitle = styled(Title2)`
  color: ${theme.colors.white};
  position: absolute;
  bottom: 3.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${theme.typography.title1.weight};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-top: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.white};
`;

const AuthorName = styled(BodyText)`
  color: ${theme.colors.white};
  font-size: 1rem;
  font-weight: ${theme.typography.weights.medium};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const HeartWrapper = styled.div`
  position: absolute;
  right: 0.25rem;
  bottom: 0.25rem;
`;

const ImageLink = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  background: none;
  cursor: pointer;
`;

export const HotRecipeCard = ({
  recipe_id,
  title,
  thumbnail,
  writer,
  likes,
  onClick,
}: HotRecipeCardProps) => {
  return (
    <Container>
      <ImageWrapper>
        <ImageLink onClick={onClick} aria-label={`${title} 상세보기`}>
          <RecipeImage src={thumbnail || '/default-recipe-image.jpg'} alt={title} />
        </ImageLink>
        <ContentOverlay>
          <StyledTitle>{title}</StyledTitle>
          <ProfileContainer>
            <ProfileImage
              src={writer.profile_image || '/default-profile-image.jpg'}
              alt={`${writer.nickname}의 프로필`}
            />
            <AuthorName>{writer.nickname}</AuthorName>
            <HeartWrapper>
              <HeartIconContainer initialLikes={likes} recipeId={recipe_id} />
            </HeartWrapper>
          </ProfileContainer>
        </ContentOverlay>
      </ImageWrapper>
    </Container>
  );
};
