import { useState } from 'react';
import styled from '@emotion/styled';
import { Share } from '@/assets/icons/Share';
import { ShareToast } from '@/components//DetailPage/ShareToast/ShareToast';

interface ShareButtonProps {
  onShare: () => void; // 공유 버튼 클릭 시 호출될 함수
}

const ButtonContainer = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

export const ShareButton = ({ onShare }: ShareButtonProps) => {
  const [showToast, setShowToast] = useState(false);

  const handleClick = () => {
    onShare(); // 공유 로직 실행
    setShowToast(true); // 토스트 표시

    // 일정 시간 후 토스트를 자동으로 닫음
    setTimeout(() => {
      setShowToast(false);
    }, 2000); // 2초 후에 토스트 사라짐
  };

  return (
    <>
      <ButtonContainer onClick={handleClick} aria-label="Share">
        <Share width={24} height={24} color="#85919D" />
      </ButtonContainer>

      {showToast && (
        <ToastContainer>
          <ShareToast type="icon" message="링크를 복사했습니다." />
        </ToastContainer>
      )}
    </>
  );
};
