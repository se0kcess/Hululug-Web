import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import RegistrationModal from '@/components/PostPage/RegistrationModal/RegistrationModal';
import useRecipeStore from '@/store/recipeStore';

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const PrevButton = styled.button`
  flex: 1;
  height: 48px;
  border: 1px solid ${theme.colors.primaryMain};
  border-radius: 12px;
  background-color: white;
  color: ${theme.colors.primaryMain};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const CompletedButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  height: 48px;
  border: none;
  border-radius: 12px;
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.primaryMain : theme.colors.gray[100]};
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: background-color 0.3s;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 24px;
  justify-content: center;
  background: #1d222880;
  z-index: 1000;
`;

interface CompletedBtnConProps {
  isActive: boolean;
  onPrev: () => void;
}

const CompletedBtnCon = ({ isActive, onPrev }: CompletedBtnConProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { title, intro, steps, ingredients, selectedRamen, thumbnail } = useRecipeStore();

  const handleCompletedClick = () => {
    if (isActive) {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  const handleRegister = async () => {
    setIsModalOpen(false);

    const requestData = {
      title,
      thumbnail,
      tags: selectedRamen.map((ramen) => ramen.id),
      introduce: intro,
      ingredients: ingredients.map((ingredient) => ({
        name: ingredient.name,
        unit: ingredient.quantity,
      })),
      cooking_steps: steps,
    };
    console.log(requestData);
  };

  return (
    <>
      <ButtonContainer>
        <PrevButton onClick={onPrev}>이전</PrevButton>
        <CompletedButton isActive={isActive} onClick={handleCompletedClick}>
          작성완료
        </CompletedButton>
      </ButtonContainer>

      {isModalOpen && (
        <ModalOverlay>
          <RegistrationModal onCancel={handleCancel} onRegister={handleRegister} />
        </ModalOverlay>
      )}
    </>
  );
};

export default CompletedBtnCon;
