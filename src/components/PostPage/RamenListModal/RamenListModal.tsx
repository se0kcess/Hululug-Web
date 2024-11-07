import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { RAMEN_LIST } from '@/constants/ramenList';
import { RamenRecipeType } from '@/types/ramenRecipe';
import ClearIcon from '@/assets/icons/Clear';
import { BodyText, ChipText } from '@/styles/Typography';

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease-in-out;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  width: 100%;
  max-width: 450px;
  max-height: 80vh;
  border-radius: 16px 16px 0 0;
  position: relative;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 2.25rem;
    height: 0.25rem;
    background-color: ${theme.colors.gray[100]};
    border-radius: 2px;
  }
`;

const Header = styled(BodyText)`
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 8px 0 12px 0;
  color: ${theme.colors.black};
  border-bottom: 1px solid ${theme.colors.gray[100]};
  margin-bottom: 16px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
`;

const Tag = styled.div<{ isSelected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? theme.colors.primaryMain : theme.colors.gray[200])};
  background-color: ${({ isSelected }) =>
    isSelected ? theme.colors.primaryPastel : theme.colors.white};
  color: ${({ isSelected }) => (isSelected ? theme.colors.primaryMain : theme.colors.gray[200])};
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s;
`;

const ApplyButton = styled.button`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 8px;
  background-color: ${theme.colors.primaryMain};
  color: ${theme.colors.white};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectedTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
`;

const SelectedTag = styled(ChipText)`
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 16px;
  background-color: ${theme.colors.white};
  color: ${theme.colors.primaryMain};
  border: 1px solid ${theme.colors.primaryMain};
  border-radius: 20px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primaryMain};
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 4px;
`;

interface RamenListModalProps {
  isOpen: boolean;
  selectedRamen: RamenRecipeType[];
  onClose: () => void;
  onApply: (selectedRamen: RamenRecipeType[]) => void;
  onTagClick: (ramen: RamenRecipeType) => void;
}

const RamenListModal = ({
  isOpen,
  selectedRamen,
  onClose,
  onApply,
  onTagClick,
}: RamenListModalProps) => {
  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Header>라면 종류</Header>
        <TagContainer>
          {RAMEN_LIST.map((ramen) => (
            <Tag
              key={ramen.id}
              isSelected={selectedRamen.some((item) => item.id === ramen.id)}
              onClick={() => onTagClick(ramen)}
            >
              {ramen.name}
            </Tag>
          ))}
        </TagContainer>
        <ApplyButton onClick={() => onApply(selectedRamen)}>적용</ApplyButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const RamenSelect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRamen, setSelectedRamen] = useState<RamenRecipeType[]>([]);

  const handleTagClick = (ramen: RamenRecipeType) => {
    if (selectedRamen.some((item) => item.id === ramen.id)) {
      setSelectedRamen(selectedRamen.filter((item) => item.id !== ramen.id));
    } else if (selectedRamen.length < 2) {
      setSelectedRamen([...selectedRamen, ramen]);
    }
  };

  const handleApply = (selected: RamenRecipeType[]) => {
    setSelectedRamen(selected);
    setIsModalOpen(false);
  };

  const handleRemoveTag = (ramen: RamenRecipeType) => {
    setSelectedRamen(selectedRamen.filter((item) => item.id !== ramen.id));
  };

  return (
    <>
      <SelectedTagContainer>
        {selectedRamen.map((ramen) => (
          <SelectedTag key={ramen.id}>
            {ramen.name}
            <RemoveButton onClick={() => handleRemoveTag(ramen)}>
              <ClearIcon width={15} height={15} fill={theme.colors.primaryLight} />
            </RemoveButton>
          </SelectedTag>
        ))}
      </SelectedTagContainer>

      <button onClick={() => setIsModalOpen(true)}>라면 종류 선택</button>

      <RamenListModal
        isOpen={isModalOpen}
        selectedRamen={selectedRamen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
        onTagClick={handleTagClick}
      />
    </>
  );
};

export default RamenSelect;
