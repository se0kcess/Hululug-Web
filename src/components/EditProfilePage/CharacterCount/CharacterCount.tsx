import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import theme from '@/styles/theme';
import Input from '@/components/EditProfilePage/Input/Input';
import { Caption } from '@/components/common/Profile/Profile';

const TextStyle = styled(Caption)<{ isError: boolean }>`
  display: flex;
  color: ${(props) => (props.isError ? theme.colors.red : theme.colors.gray[500])};
  width: auto;
`;

const CharacterCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

interface CharacterCountProps {
  maxLength: number;
  minLength?: number;
  optional?: boolean;
  propValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: (isError: boolean) => void; // 추가된 isError 콜백
}

const CharacterCount = ({
  maxLength,
  minLength = 2,
  optional = false,
  placeholder = '',
  propValue = '',
  onChange,
  isError, // 새로운 콜백 prop
}: CharacterCountProps) => {
  const [value, setValue] = useState(propValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      if (onChange) onChange(e); // e 자체를 전달
    }
  };

  const currentLength = value.length;
  const hasError = currentLength > maxLength || currentLength < minLength;

  // isError 콜백 호출로 상위 컴포넌트에 에러 상태 전달
  useEffect(() => {
    if (isError) {
      isError(hasError);
    }
  }, [hasError, isError]);

  return (
    <div style={{ width: '100%' }}>
      <Input
        color={theme.colors.gray[700]}
        borderColor={hasError ? theme.colors.red : theme.colors.gray[100]}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <CharacterCountContainer>
        <TextStyle isError={hasError}>
          {optional ? `한글/영문 포함 ${minLength}자 이상 ${maxLength}자 이하` : ''}
        </TextStyle>
        <TextStyle isError={hasError}>
          {currentLength} / {maxLength}자
        </TextStyle>
      </CharacterCountContainer>
    </div>
  );
};

export default CharacterCount;
