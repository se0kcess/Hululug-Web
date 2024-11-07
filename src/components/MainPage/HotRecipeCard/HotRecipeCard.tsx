import styled from '@emotion/styled';
import { BodyText, Title2 } from '@/styles/Typography';
import theme from '@/styles/theme';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';

interface HotRecipeProps {
  _id: string;
  recipe_id: string;
  title: string;
  thumbnail: string;
  writer: {
    nickname: string;
    profile_image: string;
  };
  likes: number;
  onClick?: () => void;
}

const Container = styled.div`
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
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
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
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
`;

const AuthorName = styled(BodyText)`
  color: ${theme.colors.white};
  font-size: 1rem;
  font-weight: ${theme.typography.weights.medium};
`;

const HeartWrapper = styled.div`
  position: absolute;
  right: 0.25rem;
`;

export const HotRecipeCard = ({
  recipe_id,
  title,
  thumbnail,
  writer,
  likes,
  onClick,
}: HotRecipeProps) => {
  return (
    <Container onClick={onClick}>
      <ImageWrapper>
        <RecipeImage src={thumbnail || '/default-recipe-image.jpg'} alt={title} />
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
