import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
`;

export default function PostPage() {
  return (
    <Container>
      <h1>Post Page</h1>
    </Container>
  );
}
