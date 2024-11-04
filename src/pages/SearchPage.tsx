import styled from '@emotion/styled';
import BackButton from '@/components/common/BackButton/BackButton';
import { Title2 } from '@/styles/Typography';
import SearchInput from '@/components/SearchPage/SearchInput/SearchInput';
import Footer from '@/components/common/Footer/Footer';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 24px;
`;

const SearchHeader = styled(Title2)`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 2;
`;

const BackBtn = styled.div`
  position: absolute;
  left: 0;
  margin-top: 3px;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
`;

export default function SearchPage() {
  return (
    <Container>
      <SearchHeader>
        검색
        <BackBtn>
          <BackButton />
        </BackBtn>
      </SearchHeader>
      <Content>
        <SearchInput />
      </Content>
      <Footer />
    </Container>
  );
}
