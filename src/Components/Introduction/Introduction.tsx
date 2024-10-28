import React from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, Title1 } from '@/styles/Typography';

interface IntroductionProps {
  title: string;
  content: string;
}

const Title = styled(Title1)`
  width: 327px;
`;

const Container = styled(BodyText)`
  width: 327px;
  height: auto;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: ${theme.colors.gray[50]};
`;

const Introduction = ({ title, content }: IntroductionProps) => {
  return (
    <>
      <Title>{title}</Title>
      <Container>{content}</Container>
    </>
  );
};

export default Introduction;
