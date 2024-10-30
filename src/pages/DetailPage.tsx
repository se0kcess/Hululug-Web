import MainImg from '@/components/DetailPage/MainImg/MainImg';
import styled from '@emotion/styled';

import ImgSrc from '@/assets/ramyun-images/sample-1.png';
import { RamenTag } from '@/components/common/RamenTag/RamenTag';
import { RenderPostDate } from '@/components/common/RenderPostDate/RenderPostDate';
import { HeartIconContainer } from '@/components/common/HeartIconContainer/HeartIconContainer';
import Introduction from '@/components/DetailPage/Introduction/Introduction';
import Profile from '@/components/DetailPage/Profile/Profile';

import SamleImg from '@/assets/images/profile-img-2.png';
import theme from '@/styles/theme';

const Container = styled.div`
  margin: 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 60px);
`;
const IntroSec = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  justify-content: space-between;
`;

const TagDateLike = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
`;
const TitleConents = styled.div`
  width: 100%;
`;

export default function DetailPage() {
  return (
    <>
      <MainImg imgSrc={ImgSrc} />
      <Container>
        <IntroSec>
          <TagDateLike>
            <RamenTag
              ramen={{ id: 1, name: '신라면' }} // ramen 객체에 id와 name을 포함
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <RenderPostDate date="2023-10-31" className="custom-class" />
              <HeartIconContainer initialLikes={100} recipeId="recipe-123" />
            </div>
          </TagDateLike>
          <TitleConents>
            <Introduction
              title="초간단 1분 라볶이"
              content="분식집 차려도 될 만큼 맛있는 라볶이 황금 비율 양념장은 추억의 바로 그 맛!"
            />
          </TitleConents>
          <hr style={{ border: `1px solid ${theme.colors.gray[100]}` }} />
          <Profile imgSrc={SamleImg} name="백종원" caption="드셔보셔유" />
        </IntroSec>
      </Container>
    </>
  );
}
