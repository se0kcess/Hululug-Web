import styled from '@emotion/styled';
import { CaptionText, Title2 } from '@/styles/Typography';
import theme from '@/styles/theme';

interface Ingredient {
  name: string;
  amount: string;
}

interface IngredientsProps {
  title: string;
  ingredientData: Ingredient[];
}

const Container = styled.div`
  width: 100%;
  max-width: 327px;
`;

const Title = styled(Title2)`
  color: ${theme.colors.black};
  padding: 0 2px 8px 2px;
  margin: 0;
  border-bottom: 1px solid ${theme.colors.black};
`;

const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const IngredientItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px 4px;
  border-bottom: 1px solid #dde2e7; // theme 수정 이후 gray 100으로 변경
`;

const IngredientName = styled(CaptionText)`
  color: ${theme.colors.gray[700]};
`;

const IngredientAmount = styled(CaptionText)`
  color: ${theme.colors.gray[700]};
`;

const Ingredients = ({ title, ingredientData }: IngredientsProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <IngredientList>
        {ingredientData.map((ingredient, index) => (
          <IngredientItem key={index}>
            <IngredientName>{ingredient.name}</IngredientName>
            <IngredientAmount>{ingredient.amount}</IngredientAmount>
          </IngredientItem>
        ))}
      </IngredientList>
    </Container>
  );
};

export default Ingredients;
