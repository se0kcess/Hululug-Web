import styled from '@emotion/styled';
import WithdrawCommentCon from '@/components/WithdrawPage/WithdrawCommentCon/WithdrawCommentCon';
import WithdrawHeader from '@/components/WithdrawPage/WithdrawHeader/WithdrawHeader';
import WithdrawProfileCon from '@/components/WithdrawPage/WithdrawProfileCon/WithdrawProfileCon';
import CheckBox from '@/components/WithdrawPage/CheckBox/CheckBox';
import BackButton from '@/components/common/BackButton/BackButton';
import WithdrawModal from '@/components/WithdrawPage/WithdrawModal/WithdrawModal';
import { ButtonText } from '@/styles/Typography';
import { useState } from 'react';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 24px 24px 24px;
  box-sizing: border-box;
  position: relative;
`;

const HeaderCon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const BackBtn = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  z-index: 100;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const WithdrawBtnCon = styled.div`
  width: 100%;
  padding: 24px;
  position: absolute;
  left: 0;
  bottom: 0;
`;

const WithdrawBtn = styled(ButtonText)<{ disabled: boolean }>`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.disabled ? '#e9ecef' : '#f6a100')};
  color: ${(props) => (props.disabled ? '#adb5bd' : '#fff')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 0 24px;
  background: rgba(0, 0, 0, 0.5); /* 검정색 배경과 투명도 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const WithdrawPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handleWithdrawClick = () => {
    if (isChecked) {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleWithdraw = () => {
    setIsModalOpen(false);
    console.log('회원 탈퇴 완료');
  };

  return (
    <PageContainer>
      <HeaderCon>
        <BackBtn>
          <BackButton width={28} height={28} />
        </BackBtn>
        <WithdrawHeader />
      </HeaderCon>
      <MainContent>
        <WithdrawCommentCon />
        <WithdrawProfileCon />
        <CheckBox checked={isChecked} onChange={handleCheckboxChange} />
      </MainContent>
      <WithdrawBtnCon>
        <WithdrawBtn disabled={!isChecked} onClick={handleWithdrawClick}>
          회원 탈퇴
        </WithdrawBtn>
      </WithdrawBtnCon>
      {isModalOpen && (
        <ModalOverlay>
          <WithdrawModal onCancel={handleCancel} onWithdraw={handleWithdraw} />
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default WithdrawPage;
