import styled from '@emotion/styled';
import { ChipText } from '@/styles/Typography';

export interface RamenType {
  name: string; // 라면 태그의 이름
}

interface RamenTagProps {
  ramen: RamenType;
  onRemove?: () => void;
}

const TagContainer = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background: ${({ theme }) => theme.colors.primaryPastel};
  color: ${({ theme }) => theme.colors.primaryMain};
  border-radius: 1rem;
  box-sizing: border-box;
  white-space: nowrap;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin-left: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primaryMain};
  font-size: 1rem;
  line-height: 1;

  &:hover {
    opacity: 0.7;
  }
`;

export const RamenTag = ({ ramen, onRemove }: RamenTagProps) => {
  return (
    <TagContainer>
      <ChipText>{ramen.name}</ChipText>
      {onRemove && <RemoveButton onClick={onRemove}>×</RemoveButton>}
    </TagContainer>
  );
};
