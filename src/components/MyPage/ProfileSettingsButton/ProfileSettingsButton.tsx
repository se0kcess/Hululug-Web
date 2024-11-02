import Settings from '@/assets/icons/Settings';
import MyPageModal from '@/components/MyPage/MyPageModal/MyPageModal';
import theme from '@/styles/theme';
import styled from '@emotion/styled';
import { useState } from 'react';
interface ProfileSettingsButtonProps {
  onLogout: () => void;
}

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: ${theme.colors.gray[50]};
  }

  &:active {
    background-color: ${theme.colors.gray[100]};
  }
`;

const ProfileSettingsButton = ({ onLogout }: ProfileSettingsButtonProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenBottomSheet} aria-label="프로필 설정">
        <Settings color={theme.colors.gray[500]} />
      </IconButton>

      <MyPageModal
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
        onLogout={onLogout}
      />
    </>
  );
};

export default ProfileSettingsButton;
