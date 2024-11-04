import { SignupForm } from '@/components/SignUpPage/SignUpForm/SignUpForm';
import styled from '@emotion/styled';

const SignupContainer = styled.div`
  margin: 0 auto;
  padding: 1rem;
`;

export const SignupPage = () => {
  return (
    <SignupContainer>
      <SignupForm />
    </SignupContainer>
  );
};
