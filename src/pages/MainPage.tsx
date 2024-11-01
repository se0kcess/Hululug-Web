import Footer from '@/components/common/Footer/Footer';
import BannerSlider from '@/components/MainPage/Banner/BannerSlider';
import { FilterButtons } from '@/components/MainPage/FilterButtons/FilterButtons';
import Header from '@/components/MainPage/Header/Header';
import HotRecipeCard from '@/components/MainPage/HotRecipeCard/HotRecipeCard';
import RamenList from '@/components/common/RamenList/RamenList';
import { Title1 } from '@/styles/Typography';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  min-height: calc(100vh - 60px);
`;

const Recipe = styled(Title1)`
  padding: 1rem 0;
`;

const RecipeRow = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 0.5rem 0;
`;

const RecipeCard = styled.div`
  flex: 0 0 auto;
  width: calc(70% - 1.2rem);
`;

export default function MainPage() {
  const hotRecipes = [
    {
      id: '1',
      title: '초간단 1분 라볶이',
      author: '백종원',
      likes: 1100,
    },
    {
      id: '2',
      title: '피시방 짜계치',
      author: '라면왕',
      likes: 950,
    },
    {
      id: '3',
      title: '해물 라면',
      author: '라면킹',
      likes: 850,
    },
  ];

  const allRecipes = [
    {
      id: '4',
      title: '초간단 1분 라볶이',
      author: '백종원',
      authorImage: '/src/assets/images/profile-img-1.png',
      likes: 1100,
      date: '24.10.23',
      image: '/src/assets/ramyun-images/sample-1.png',
      ramenType: { id: 20, name: '짜파게티' },
      bookmarkId: 1,
    },
    {
      id: '5',
      title: '피시방 짜계치',
      author: '라면왕',
      authorImage: '/src/assets/images/profile-img-2.png',
      likes: 1100,
      date: '24.10.22',
      image: '/src/assets/ramyun-images/sample-2.png',
      ramenType: { id: 10, name: '삼양라면' },
      bookmarkId: 2,
    },
    {
      id: '6',
      title: '해물 듬뿍 라면',
      author: '안성재',
      authorImage: '/src/assets/images/profile-img-3.png',
      likes: 98,
      date: '24.10.22',
      image: '/src/assets/ramyun-images/sample-3.png',
      ramenType: { id: 12, name: '신라면' },
      bookmarkId: 3,
    },
  ];

  const handleRecipeClick = (id: string) => {
    console.log(`Recipe clicked: ${id}`);
  };

  return (
    <>
      <Header />
      <Container>
        <BannerSlider />
        <Recipe>인기있는 레시피</Recipe>
        <RecipeRow>
          {hotRecipes.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <HotRecipeCard
                id={recipe.id}
                title={recipe.title}
                author={recipe.author}
                likes={recipe.likes}
              />
            </RecipeCard>
          ))}
        </RecipeRow>
        <Recipe>모든 레시피</Recipe>
        <FilterButtons />
        <RamenList recipes={allRecipes} onRecipeClick={handleRecipeClick} />
      </Container>
      <Footer />
    </>
  );
}
