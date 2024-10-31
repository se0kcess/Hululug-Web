import styled from '@emotion/styled';

import { Title2 } from '@/styles/Typography';
import theme from '@/styles/theme';

const PostHeader = styled(Title2)`
  width: 100%;
  height: 56px;
  color: ${theme.colors.gray[700]};
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PostPageHeader = () => {
  return <PostHeader>레시피 작성</PostHeader>;
};

export default PostPageHeader;
