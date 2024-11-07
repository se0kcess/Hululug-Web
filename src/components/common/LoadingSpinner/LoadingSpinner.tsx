import styled from '@emotion/styled';
import theme from '@/styles/theme';

const SpinnerContainer = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid ${theme.colors.gray[200]};
  border-radius: 50%;
  border-top-color: ${theme.colors.primaryMain};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinner = () => {
  return <SpinnerContainer />;
};
