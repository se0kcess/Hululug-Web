import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { ButtonText, Title2 } from '@/styles/Typography';
import { ArrowDown } from '@/assets/icons/ArrowDown';

const Container = styled.div`
  width: 100%;
  max-width: 450px;
`;

const Label = styled(Title2)`
  color: ${theme.colors.black};
  margin-bottom: 12px;
`;

const SelectBox = styled(ButtonText)`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${theme.colors.gray[200]};
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 4px;
  background-color: ${theme.colors.white};
  cursor: pointer;
  box-sizing: border-box;
`;

const Placeholder = styled.span`
  color: ${theme.colors.gray[200]};
`;

const IconWrapper = styled.div`
  color: ${theme.colors.gray[200]};
`;

const RamenTypeSelect = () => {
  return (
    <Container>
      <Label>라면 종류(최대 2개)</Label>
      <SelectBox>
        <Placeholder>라면 종류를 선택해주세요.</Placeholder>
        <IconWrapper>
          <ArrowDown />
        </IconWrapper>
      </SelectBox>
    </Container>
  );
};

export default RamenTypeSelect;
