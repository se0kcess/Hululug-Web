import styled from '@emotion/styled';
import { CaptionText } from '@/styles/Typography';
import { HeartFill } from '@/assets/icons/HeartFill';
import { HeartOutline } from '@/assets/icons/HeartOutline';
import theme from '@/styles/theme';
import { useLike } from '@/hooks/useLike';

interface HeartIconContainerProps {
  initialLikes: number;
  recipeId: string;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  likeCountColor?: string;
}
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
`;

interface IconWrapperProps {
  isActive: string;
  size: number;
  activeColor: string;
  inactiveColor: string;
}

const IconWrapper = styled.div<IconWrapperProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  position: relative;
  transition: all 0.2s ease-in-out;
  color: ${({ isActive, activeColor, inactiveColor }) =>
    isActive === 'true' ? activeColor : inactiveColor};

  &:hover {
    color: ${({ activeColor }) => activeColor};
  }
`;

const StyledLikeCount = styled(CaptionText)<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  min-width: 1rem;
`;

export const HeartIconContainer = ({
  initialLikes,
  recipeId,
  size = 20,
  activeColor = theme.colors.white,
  inactiveColor = theme.colors.white,
  likeCountColor = theme.colors.white,
}: HeartIconContainerProps) => {
  const { likeCount, isLiked, toggleLike, isLoading } = useLike(recipeId, initialLikes);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoading) {
      toggleLike();
    }
  };

  return (
    <Container onClick={handleLikeClick}>
      <IconWrapper
        isActive={isLiked.toString()}
        size={size}
        activeColor={activeColor}
        inactiveColor={inactiveColor}
      >
        {isLiked ? <HeartFill /> : <HeartOutline />}
      </IconWrapper>
      <StyledLikeCount textColor={likeCountColor}>{likeCount.toLocaleString()}</StyledLikeCount>
    </Container>
  );
};
