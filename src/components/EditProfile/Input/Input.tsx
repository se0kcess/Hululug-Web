import React from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';

export interface InputType {
  color: string;
  borderColor?: string;
  disabled: boolean;
  placeholder: string;
  type?: string;
  value?: string; // value prop 추가
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input<{ inputColor: string; inputBorderColor?: string }>`
  width: 327px;
  height: 44px;
  padding: 8px 16px;
  color: ${(props) => props.inputColor};
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.inputBorderColor || theme.colors.gray[100]};
  border-radius: 4px;
  outline: none;
  &:disabled {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[200]};
  }
`;

const Input = ({
  color,
  borderColor,
  disabled,
  placeholder,
  type = 'text',
  value,
  onChange,
  onFocus,
}: InputType) => {
  return (
    <StyledInput
      inputColor={color}
      inputBorderColor={borderColor}
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
    />
  );
};

export default Input;
