import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { ButtonText } from '@/styles/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 8px 16px;
  color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: ${theme.colors.gray[200]};
  }
`;

const Button = styled(ButtonText)<{ isActive: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  background-color: ${({ isActive }) =>
    isActive ? theme.colors.primaryMain : theme.colors.gray[100]};
  color: ${theme.colors.white};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  transition: background-color 0.3s;
`;

const NextBtn = () => {
  const [inputValues, setInputValues] = useState({ input1: '', input2: '' });

  // isActive의 값이 boolean이 되도록 변경
  const isActive: boolean = !!inputValues.input1 && !!inputValues.input2;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container>
      <Input
        name="input1"
        placeholder="첫 번째 입력"
        value={inputValues.input1}
        onChange={handleInputChange}
      />
      <Input
        name="input2"
        placeholder="두 번째 입력"
        value={inputValues.input2}
        onChange={handleInputChange}
      />
      <Button isActive={isActive}>다음</Button>
    </Container>
  );
};

export default NextBtn;
