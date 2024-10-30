import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import Home from '@/assets/icons/Home';
import Search from '@/assets/icons/Search';
import Edit from '@/assets/icons/Edit';
import User from '@/assets/icons/User';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  height: 4rem;
  background-color: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.gray[100]};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  z-index: 100;
`;

const NavButton = styled.button<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.primaryMain : theme.colors.gray[500])};
  transition: all 0.2s ease-in-out;

  &:active {
    transform: scale(0.95);
  }
`;

const NavText = styled.span`
  font-size: 0.75rem;
`;

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: Home, text: '홈' },
    { path: '/search', icon: Search, text: '검색' },
    { path: '/post', icon: Edit, text: '글 작성' },
    { path: '/mypage', icon: User, text: '마이페이지' },
  ];

  return (
    <FooterContainer>
      {navItems.map(({ path, icon: Icon, text }) => (
        <NavButton key={path} onClick={() => navigate(path)} isActive={isActive(path)}>
          <Icon
            width={24}
            height={24}
            color={isActive(path) ? theme.colors.primaryMain : theme.colors.gray[500]}
          />
          <NavText>{text}</NavText>
        </NavButton>
      ))}
    </FooterContainer>
  );
};

export default Footer;
