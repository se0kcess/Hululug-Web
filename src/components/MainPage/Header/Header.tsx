import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { Logo } from '@/assets/logos/Logo';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LogoWrapper = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: ${theme.colors.white};
  color: ${theme.colors.black};
  font-size: ${theme.typography.title2.size};
  font-weight: ${theme.typography.title2.weight};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:active {
    transform: scale(0.95);
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <LogoWrapper onClick={handleLogoClick}>
        <Logo />
      </LogoWrapper>
      <LoginButton onClick={handleLoginClick}>로그인</LoginButton>
    </HeaderContainer>
  );
};

export default Header;
