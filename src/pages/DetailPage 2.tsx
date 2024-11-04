import { useRef } from 'react';

import styled from '@emotion/styled';
import MainImg from '@/components/DetailPage/MainImg/MainImg';
import ImgSrc from '@/assets/ramyun-images/sample-1.png';
import { RamenTag } from '@/components/common/RamenTag/RamenTag';
import { RenderPostDate } from '@/components/common/RenderPostDate/RenderPostDate';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import Introduction from '@/components/DetailPage/Introduction/Introduction';
import Profile from '@/components/common/Profile/Profile';
import Ingredients from '@/components/DetailPage/Ingredients/Ingredients';
import CookingSteps from '@/components/DetailPage/CookingSteps/CookingSteps';
import CommentInput from '@/components/DetailPage/CommentInput/CommentInput';
import Comments from '@/components/DetailPage/Comments/Comments';
import { ActionBar } from '@/components/DetailPage/ActionBar/ActionBar';

import SamleImg from '@/assets/images/profile-img-2.png';
import theme from '@/styles/theme';
import BackButton from '@/components/common/BackButton/BackButton';

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

export default function DetailPage() {
  const commentSecRef = useRef<HTMLDivElement>(null);
  const handleLike = () => {
    console.log('Liked!');
  };

  const handleComment = () => {
    // CommentSec으로 스크롤 이동
    if (commentSecRef.current) {
      commentSecRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookmark = () => {
    console.log('Bookmark toggled!');
  };

  const handleShare = () => {
    console.log('Shared!');
  };
  return (
    <>
      <Container>
        <BackButtonContainer>
          <BackButton width={32} height={32} fill={theme.colors.white} />
        </BackButtonContainer>
        <MainImg imgSrc={ImgSrc}></MainImg>
        <IntroSec>
          {/* 태그와 날짜/좋아요 아이콘 배치 */}
          <TagDateLike>
            <RamenTag ramen={{ id: 1, name: '신라면' }} />
            <div style={{ display: 'flex', gap: 8 }}>
              <RenderPostDate date="2023-10-31" className="custom-class" />
              <HeartIconContainer
                activeColor={theme.colors.gray[500]}
                inactiveColor={theme.colors.gray[500]}
                likeCountColor={theme.colors.gray[500]}
                initialLikes={100}
                recipeId="recipe-123"
              />
            </div>
          </TagDateLike>

          {/* 레시피 소개 및 프로필 섹션 */}
          <Introduction
            title="초간단 1분 라볶이"
            content="분식집 차려도 될 만큼 맛있는 라볶이 황금 비율 양념장은 추억의 바로 그 맛!"
          />
          <hr style={{ border: `1px solid ${theme.colors.gray[100]}` }} />
          <Profile imgSrc={SamleImg} name="백종원" caption="드셔보셔유" />
        </IntroSec>

        {/* 재료 및 조리 과정 */}
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
            ingredientData={[
              { name: '라면', amount: '1개' },
              { name: '대파', amount: '1/3대' },
              { name: '물', amount: '1.5컵' },
              { name: '황설탕', amount: '1T' },
              { name: '고추장', amount: '1T' },
            ]}
          />

          <CookingSteps
            steps={[
              { number: 1, description: '대파는 송송 썰어 준비한다.' },
              {
                number: 2,
                description:
                  '냄비에 물, 분말스프(1/2~2/3), 건더기스프, 설탕, 고추장을 넣고 풀어주며 끓인다.',
              },
              { number: 3, description: '육수가 끓으면 면을 넣고 끓인다.' },

              { number: 4, description: '면이 완전히 풀어지면 대파를 넣고 1분 정도 더 끓인다.' },
              {
                number: 5,
                description: '물이 줄어들고 면이 익으면 불을 끄고 그릇에 담아 완성한다.',
              },
            ]}
          />
        </IngredientsCon>

        {/* 댓글 섹션 */}
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
            recipeId={1}
            isLoggedIn={true}
            onCommentAdded={(content) => console.log(content)}
          />
        </CommentInputCon>
        <CommentSec ref={commentSecRef}>
          <Comments
            comments={[
              {
                id: 1,
                avatar: '../../src/assets/images/profile-img-2.png',
                name: '라면왕(나)',
                content: '라면왕은 전데요?',
                date: '2024.10.24',
                isOwnComment: true,
                edited: true,
              },
              {
                id: 2,
                avatar: '../../src/assets/images/profile-img-3.png',
                name: '롱스톤',
                content: '텍스처가 없잖아요',
                date: '2024.10.25',
                isOwnComment: true,
                edited: true,
              },
              {
                id: 3,
                avatar: '../../src/assets/images/profile-img-4.png',
                name: '물코기',
                content: '물..물코기',
                date: '2024.10.25',
                isOwnComment: false,
              },
            ]}
            recipeId={123}
            onCommentsUpdate={(updatedComments) => console.log('comments updated', updatedComments)}
          />
        </CommentSec>

        <ActionBarCon>
          <ActionBar
            likes={120} // Initial likes count
            comments={34} // Initial comments count
            recipeId="123" // Unique recipe ID as a string
            onLike={handleLike} // Like event handler
            onComment={handleComment} // Comment event handler
            onBookmark={handleBookmark} // Bookmark event handler
            onShare={handleShare} // Share event handler
          />
        </ActionBarCon>
      </Container>
    </>
  );
}
