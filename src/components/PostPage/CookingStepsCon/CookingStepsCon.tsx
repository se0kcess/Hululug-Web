import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, Title2 } from '@/styles/Typography';
import Plus from '@/assets/icons/Plus';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 500px;
`;

const Title = styled(Title2)`
  color: ${theme.colors.black};
  margin: 0;
`;

const StepLabel = styled(BodyText)`
  color: ${theme.colors.primaryMain};
  margin: 0;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 12px 16px;
  color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  resize: none;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.colors.gray[200]};
  }
`;

const AddButton = styled.button`
  width: 100%;
  height: 40px;
  margin: 33px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[50]};
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CookingStepsCon = () => {
  const [steps, setSteps] = useState(['']);

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  return (
    <Container>
      <Title>조리 순서</Title>
      {steps.map((step, index) => (
        <StepContainer key={index}>
          <StepLabel>STEP {index + 1}</StepLabel>
          <Input
            placeholder="레시피를 입력해주세요."
            value={step}
            onChange={(e) => handleStepChange(index, e.target.value)}
          />
        </StepContainer>
      ))}
      <AddButton onClick={handleAddStep}>
        <Plus width={20} height={20} fill={theme.colors.gray[500]} />
      </AddButton>
    </Container>
  );
};

export default CookingStepsCon;
