import styled from '@emotion/styled';
import { Title2, BodyText } from '@/styles/Typography';
import theme from '@/styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled(Title2)`
  color: ${theme.colors.gray[700]};
  border: 1px solid red;
  margin-top: 40px;
  margin-bottom: 4px;
`;

const Subtitle = styled(BodyText)`
  color: ${theme.colors.gray[500]};
  margin: 0;
`;

const SectionTitle = styled(BodyText)`
  color: ${theme.colors.gray[700]};
  margin: 0;
  margin-top: 24px;
`;

const List = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
  list-style-type: disc;i
`;

const ListItem = styled.li`
  color: ${theme.colors.gray[500]};
  margin-bottom: 4px;
  line-height: 1.5;
`;

const WithdrawCommentCon = () => {
  return (
    <Container>
      <Title>회원 탈퇴 시 유의사항</Title>
      <Subtitle>탈퇴 전 아래 내용을 반드시 확인해 주세요.</Subtitle>
      <SectionTitle>처리내용</SectionTitle>
      <List>
        <ListItem>탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다.</ListItem>
        <ListItem>
          단, 작성한 게시글 및 댓글은 자동으로 삭제되지 않으므로 게시물 삭제를 원하는 경우에는 먼저
          해당 게시물 삭제 후, 탈퇴를 진행해 주세요.
        </ListItem>
      </List>
    </Container>
  );
};

export default WithdrawCommentCon;
