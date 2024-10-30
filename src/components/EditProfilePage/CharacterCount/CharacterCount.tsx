import { Caption } from '@/components/DetailPage/Profile/Profile';
import styled from '@emotion/styled';
import React, { useState } from 'react';
import theme from '@/styles/theme';
import Input from '@/components/EditProfilePage/Input/Input';

const TextStyle = styled(Caption)<{ isError: boolean }>`
  color: ${(props) => (props.isError ? theme.colors.red : theme.colors.gray[500])};
`;

const CharacterCountContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

interface CharacterCountProps {
  maxLength: number;
  minLength?: number; // 최소 글자 수
  optional?: boolean; // 선택사항 여부
  propValue?: string; // input prop value (optional)
}

const CharacterCount = ({
  maxLength,
  minLength = 2,
  optional = false,
  propValue,
}: CharacterCountProps) => {
  const [value, setValue] = useState(propValue ? propValue : '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setValue(e.target.value);
    }
  };

  const currentLength = value.length;
  const isError = currentLength > maxLength || currentLength < minLength;

  return (
    <div>
      <Input
        color={theme.colors.gray[700]}
        borderColor={isError ? theme.colors.red : theme.colors.gray[100]}
        disabled={false}
        placeholder="변경할 닉네임을 입력해주세요"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <CharacterCountContainer>
        <TextStyle isError={isError}>
          {optional ? `한글/영문 포함 ${minLength}자 이상 ${maxLength}자 이하` : ''}
        </TextStyle>
        <TextStyle isError={isError}>
          {currentLength} / {maxLength}자
        </TextStyle>
      </CharacterCountContainer>
    </div>
  );
};

export default CharacterCount;
