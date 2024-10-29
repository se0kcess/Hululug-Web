import styled from '@emotion/styled';
import { CaptionText } from '@/styles/Typography';
import { HeartFill } from '@/assets/icons/HeartFill';
import { HeartOutline } from '@/assets/icons/HeartOutline';
import useLikeStore from '@/store/likeStore';

interface HeartIconContainerProps {
  initialLikes: number;
  recipeId: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;

const IconWrapper = styled.div<{ isActive: string }>`
  width: 1.25rem;
  height: 1.25rem;
  position: relative;
  transition: all 0.2s ease-in-out;
  color: ${({ isActive, theme }) =>
    isActive === 'true' ? theme.colors.white : theme.colors.gray[200]};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const StyledLikeCount = styled(CaptionText)`
  color: ${({ theme }) => theme.colors.white};
  min-width: 1rem;
`;

export const HeartIconContainer = ({ initialLikes, recipeId }: HeartIconContainerProps) => {
  const { toggleLike, activeLikes, getLikeCount } = useLikeStore();

  const isActive = activeLikes.has(recipeId);
  const currentLikes = getLikeCount(recipeId, initialLikes);

  const handleLikeClick = () => {
    toggleLike(recipeId, initialLikes);
  };

  return (
    <Container onClick={handleLikeClick}>
      <IconWrapper isActive={isActive.toString()}>
        {isActive ? <HeartFill /> : <HeartOutline />}
      </IconWrapper>
      <StyledLikeCount>{currentLikes.toLocaleString()}</StyledLikeCount>
    </Container>
  );
};
