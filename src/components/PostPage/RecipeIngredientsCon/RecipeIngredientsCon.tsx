import { useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { BodyText, Title2 } from '@/styles/Typography';
import Plus from '@/assets/icons/Plus';

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
  flex: 3; /* NameInput과 동일한 flex 값으로 설정 */
  display: flex;
  align-items: center;
`;

const Label2 = styled(BodyText)`
  color: ${theme.colors.gray[500]};
  margin: 0;
  flex: 1; /* QuantityInput과 동일한 flex 값으로 설정 */
  display: flex;
  align-items: center;
`;

const InputRow = styled.div`
  display: flex;
  width: 100%; /* Row가 가로를 충분히 차지하도록 설정 */
  gap: 8px;
`;

const NameInput = styled.input`
  flex: 1; /* 재료명 필드의 너비를 넓게 설정 */
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
  width: 100px;
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
      <AddButton onClick={handleAddIngredient}>
        <Plus width={16} height={16} fill={theme.colors.gray[500]} />
      </AddButton>
    </Container>
  );
};

export default RecipeIngredientsCon;
