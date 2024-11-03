import styled from '@emotion/styled';
import theme from '@/styles/theme';
import { Title2 } from '@/styles/Typography';

const EditProgileHeader = styled(Title2)`
  width: 100%;
  height: 56px;
  color: ${theme.colors.gray[700]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0;
`;

const EditProfileHeader = () => {
  return <EditProgileHeader>프로필 수정</EditProgileHeader>;
};

export default EditProfileHeader;
