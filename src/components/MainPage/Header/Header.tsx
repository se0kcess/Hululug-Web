import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import Logo from '@/assets/logos/Logo';
import { useAuthStore } from '@/store/authStore';

const HeaderContainer = styled.header`
  display: flex;
  background-color: ${theme.colors.white};
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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

  &:hover {
    color: ${theme.colors.primaryMain};
  }
`;

const ProfileButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  background: none;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid ${theme.colors.primaryMain};
`;

const DefaultProfileIcon = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.gray[100]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray[500]};
  font-size: ${theme.typography.body.size};
  border: 2px solid ${theme.colors.gray[200]};
`;

export const Header = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/mypage');
  };

  const renderAuthButton = () => {
    if (!isAuthenticated || !user) {
      return <LoginButton onClick={handleLoginClick}>로그인</LoginButton>;
    }

    return (
      <ProfileButton onClick={handleProfileClick} aria-label="마이페이지">
        {user.profile_image ? (
          <ProfileImage src={user.profile_image} alt={`${user.nickname}의 프로필`} />
        ) : (
          <DefaultProfileIcon>{user.nickname[0].toUpperCase()}</DefaultProfileIcon>
        )}
      </ProfileButton>
    );
  };

  return (
    <HeaderContainer>
      <LogoWrapper onClick={handleLogoClick}>
        <Logo />
      </LogoWrapper>
      {renderAuthButton()}
    </HeaderContainer>
  );
};
