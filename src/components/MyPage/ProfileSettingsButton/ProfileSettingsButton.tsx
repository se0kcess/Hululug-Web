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
  align-items: top;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
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
