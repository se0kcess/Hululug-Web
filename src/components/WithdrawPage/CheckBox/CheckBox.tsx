import { useState } from 'react';
import styled from '@emotion/styled';
import Check from '@/assets/icons/Check';
import { BodyText } from '@/styles/Typography';
import theme from '@/styles/theme';

const CheckBoxContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: pointer;
  padding: 8px 4px;
  box-sizing: border-box;
  gap: 12px;
`;

const StyledCheckBox = styled.div<{ isChecked: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.isChecked ? theme.colors.primaryMain : '#ccc')};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isChecked ? theme.colors.primaryMain : 'transparent')};
  box-sizing: border-box;
`;
const CheckBoxText = styled(BodyText)`
  width: 70%;
`;

export interface CheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const CheckBox = ({ checked = false, onChange }: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckBoxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <CheckBoxContainer onClick={handleCheckBoxChange}>
      <StyledCheckBox isChecked={isChecked}>
        {isChecked && <Check width={20} height={20} fill="#fff" />}
      </StyledCheckBox>
      <CheckBoxText>위 내용을 모두 확인했습니다.</CheckBoxText>
    </CheckBoxContainer>
  );
};

export default CheckBox;
