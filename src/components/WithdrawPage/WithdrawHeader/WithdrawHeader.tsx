import { Title2 } from '@/styles/Typography';
import styled from '@emotion/styled';

const Header = styled(Title2)`
  width: 100%;
  height: 56px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const WithdrawHeader = () => {
  return <Header>회원 탈퇴</Header>;
};

export default WithdrawHeader;
