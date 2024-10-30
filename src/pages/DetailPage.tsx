import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);
`;

export default function DetailPage() {
  return (
    <Container>
      <h1>Detail Page</h1>
    </Container>
  );
}
