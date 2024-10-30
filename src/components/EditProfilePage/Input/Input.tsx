import React from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';

export interface InputType {
  color?: string;
  borderColor?: string;
  disabled: boolean;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// BodyText 스타일을 가져와 input에 직접 적용
const StyledInput = styled.input<{ inputColor?: string; inputBorderColor?: string }>`
  font-size: ${theme.typography.body.size};
  line-height: ${theme.typography.body.lineHeight};
  font-weight: ${theme.typography.body.weight};
  width: 100%;
  height: 44px;
  padding: 8px 16px;
  color: ${(props) =>
    props.value ? theme.colors.gray[700] : props.inputColor || theme.colors.gray[200]};
  border: 1px solid ${(props) => props.inputBorderColor || theme.colors.gray[100]};
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: ${theme.colors.gray[200]};
  }

  &:disabled {
    background-color: ${theme.colors.gray[50]};
    color: ${theme.colors.gray[200]};
  }
`;

const Input = ({
  color = theme.colors.gray[200],
  borderColor = theme.colors.gray[100],
  disabled,
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
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
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};

export default Input;
