import styled from '@emotion/styled';
import { Title2 } from '@/styles/Typography';
import { RenderPostDate } from '@/components/common/RenderPostDate/RenderPostDate';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import { RamenTag } from '@/components/common/RamenTag/RamenTag';
import theme from '@/styles/theme';
interface MyRecipeCardProps {
  id: string;
  title: string;
  date: string;
  likes: number;
  imageUrl: string;
  tags: string[];
}

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.white};
  box-shadow: ${theme.shadows[1]};
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 75%;
  overflow: hidden;
`;

const RecipeImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  padding: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledTitle = styled(Title2)`
  color: ${({ theme }) => theme.colors.black};

  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyRecipeCard = ({ id, title, date, likes, imageUrl, tags }: MyRecipeCardProps) => {
  const ramenTag = tags[0];

  return (
    <CardContainer>
      <ImageContainer>
        <RecipeImage src={imageUrl} alt={title} />
      </ImageContainer>

      <ContentContainer>
        <TitleRow>
          <StyledTitle>{title}</StyledTitle>
          {ramenTag && (
            <RamenTag
              ramen={{
                id: 'ramen-id', // 또는 적절한 id 생성 로직
                name: ramenTag,
              }}
            />
          )}
        </TitleRow>

        <BottomRow>
          <RenderPostDate date={date} />
          <HeartIconContainer
            activeColor={theme.colors.gray[500]}
            inactiveColor={theme.colors.gray[500]}
            recipeId={id}
            initialLikes={likes}
          />
        </BottomRow>
      </ContentContainer>
    </CardContainer>
  );
};

export default MyRecipeCard;
