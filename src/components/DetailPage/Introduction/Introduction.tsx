import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, Title1 } from '@/styles/Typography';

interface IntroductionProps {
  title: string;
  content: string;
}

export const Title = styled(Title1)`
  width: 100%;
  padding: 16px 0;
`;

export const Container = styled(BodyText)`
  width: 100%;
  height: auto;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${theme.colors.gray[50]};
  margin-bottom: 16px;
`;

const Introduction = ({ title, content }: IntroductionProps) => {
  return (
    <>
      <Title>{title === '' ? '제목이 없습니다.' : title}</Title>
      <Container>{content === '' ? '소개글이 없습니다.' : content}</Container>
    </>
  );
};

export default Introduction;
