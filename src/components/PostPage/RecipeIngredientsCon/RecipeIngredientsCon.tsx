import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, Title2 } from '@/styles/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  gap: 12px;
`;

const Title = styled(Title2)`
  color: ${theme.colors.black};
  margin: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label1 = styled(BodyText)`
  color: ${theme.colors.gray[500]};
  margin: 0;
  flex: 2; /* NameInput과 동일한 flex 값 */
  display: flex;
  align-items: center;
`;

const Label2 = styled(BodyText)`
  color: ${theme.colors.gray[500]};
  margin: 0;
  flex: 1; /* QuantityInput과 동일한 flex 값 */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

const NameInput = styled.input`
  flex: 2; /* 재료명 필드의 너비를 더 넓게 설정 */
  height: 44px;
  padding: 0 12px;
  color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.colors.gray[200]};
  }
`;

const QuantityInput = styled.input`
  flex: 1; /* 수량 필드의 너비를 상대적으로 좁게 설정 */
  height: 44px;
  padding: 0 12px;
  color: ${theme.colors.gray[700]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.colors.gray[200]};
  }
`;

const AddButton = styled.button`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.gray[50]};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px;
  color: ${theme.colors.gray[500]};
`;

const RecipeIngredientsCon = () => {
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleInputChange = (index: number, field: 'name' | 'quantity', value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  return (
    <Container>
      <Title>재료</Title>
      <Header>
        <Label1>재료명</Label1>
        <Label2>수량 및 단위</Label2>
      </Header>
      {ingredients.map((ingredient, index) => (
        <InputRow key={index}>
          <NameInput
            placeholder="재료명"
            value={ingredient.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
          />
          <QuantityInput
            placeholder="1T, 1큰술"
            value={ingredient.quantity}
            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
          />
        </InputRow>
      ))}
      <AddButton onClick={handleAddIngredient}>+</AddButton>
    </Container>
  );
};

export default RecipeIngredientsCon;
