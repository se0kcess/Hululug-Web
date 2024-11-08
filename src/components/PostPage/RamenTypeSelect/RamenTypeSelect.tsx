import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { RAMEN_LIST } from '@/constants/ramenList';
import { RamenRecipeType } from '@/types/ramenRecipe';
import ClearIcon from '@/assets/icons/Clear';
import { BodyText, ButtonText, ChipText, Title2 } from '@/styles/Typography';
import { ArrowDown } from '@/assets/icons/ArrowDown';
import useRecipeStore from '@/store/recipeStore';

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 24px 0 12px 0;
`;

const Label = styled(Title2)`
  color: ${theme.colors.black};
  margin-bottom: 12px;
`;

const SelectBox = styled(ButtonText)`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${theme.colors.gray[200]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  background-color: ${theme.colors.white};
  cursor: pointer;
  box-sizing: border-box;
`;

const Placeholder = styled.span`
  color: ${theme.colors.gray[200]};
`;

const IconWrapper = styled.div`
  color: ${theme.colors.gray[200]};
`;

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
  margin-bottom: 12px;
`;

const Tag = styled(ChipText)<{ isSelected: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid
    ${({ isSelected }) => (isSelected ? theme.colors.primaryMain : theme.colors.gray[200])};
  background-color: ${theme.colors.white};
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
  border-radius: 12px;
  background-color: ${theme.colors.primaryMain};
  color: ${theme.colors.white};
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SelectedTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 16px;
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

const RamenTypeSelect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedRamen, setSelectedRamen, setRamenSelected } = useRecipeStore();

  const handleTagClick = (ramen: RamenRecipeType) => {
    if (selectedRamen.some((item) => item.id === ramen.id)) {
      setSelectedRamen(selectedRamen.filter((item) => item.id !== ramen.id));
    } else if (selectedRamen.length < 2) {
      setSelectedRamen([...selectedRamen, ramen]);
    }
  };

  const handleApply = () => {
    setIsModalOpen(false);
    if (selectedRamen.length > 0) {
      setRamenSelected(true); // 라면이 선택되면 true로 설정
    } else {
      setRamenSelected(false); // 선택된 라면이 없으면 false로 설정
    }
  };

  const handleRemoveTag = (ramen: RamenRecipeType) => {
    const updatedRamen = selectedRamen.filter((item) => item.id !== ramen.id);
    setSelectedRamen(updatedRamen);
    if (updatedRamen.length === 0) {
      setRamenSelected(false); // 모든 라면이 제거되었을 때 false로 설정
    }
  };

  return (
    <Container>
      <Label>라면 종류(최대 2개)</Label>
      <SelectBox onClick={() => setIsModalOpen(true)}>
        {selectedRamen.length > 0 ? (
          <span>{selectedRamen.map((ramen) => ramen.name).join(', ')}</span>
        ) : (
          <Placeholder>라면 종류를 선택해주세요.</Placeholder>
        )}
        <IconWrapper>
          <ArrowDown />
        </IconWrapper>
      </SelectBox>

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

      <ModalOverlay
        isOpen={isModalOpen}
        onClick={() => {
          setIsModalOpen(false);
          handleApply();
        }}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <Header>라면 종류</Header>
          <TagContainer>
            {RAMEN_LIST.map((ramen) => (
              <Tag
                key={ramen.id}
                isSelected={selectedRamen.some((item) => item.id === ramen.id)}
                onClick={() => handleTagClick(ramen)}
              >
                {ramen.name}
              </Tag>
            ))}
          </TagContainer>
          <ApplyButton onClick={handleApply}>적용</ApplyButton>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default RamenTypeSelect;
