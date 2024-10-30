import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, Title2 } from '@/styles/Typography';

interface Step {
  number: number;
  description: string;
}

interface CookingStepsProps {
  steps: Step[];
}

const Container = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const StyledTitle = styled(Title2)`
  color: ${theme.colors.black};
  margin-bottom: 16px;
`;

const StepContainer = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  background-color: ${theme.colors.primaryPastel};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const StepNumber = styled(BodyText)`
  width: 8px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primaryMain};
  border-radius: 50%;
  margin: 0;
  margin-right: 12px;
  flex-shrink: 0;
`;

const StepDescription = styled(BodyText)`
  color: ${theme.colors.gray[700]};
  margin: 0;
  display: flex;
`;

export const Title = ({ text }: { text: string }) => <StyledTitle>{text}</StyledTitle>;

const CookingSteps = ({ steps }: CookingStepsProps) => {
  return (
    <Container>
      <Title text="조리 순서" />
      {steps.map((step) => (
        <StepContainer key={step.number}>
          <StepNumber>{step.number}</StepNumber>
          <StepDescription>{step.description}</StepDescription>
        </StepContainer>
      ))}
    </Container>
  );
};

export default CookingSteps;
