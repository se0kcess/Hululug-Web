// import { useState } from 'react';
// import styled from '@emotion/styled';
// import { Tab } from '@/types/tab';
// import sampleImage from '@/assets/ramyun-images/sample-3.png';
// import theme from '@/styles/theme';
// import MyRecipeCard from '@/components/MyPage/MyRecipeCard/MyRecipeCard';
// import MyCommentList from '@/components/MyPage/MyCommentList/MyCommentList';
// import BackButton from '@/components/common/BackButton/BackButton';
// import ProfileSettingsButton from '@/components/MyPage/ProfileSettingsButton/ProfileSettingsButton';
// import { TabNavigation } from '@/components/MyPage/TabNavigation/TabNavigation';
// import { Title1 } from '@/styles/Typography';
// import Footer from '@/components/common/Footer/Footer';

// const Container = styled.div`
//   margin: 0 auto;
//   min-height: 100vh;
// `;

// const Header = styled.header`
//   display: grid;
//   grid-template-columns: 24px 1fr 24px;
//   align-items: center;
//   padding: 1rem;
// `;

// const Title = styled(Title1)`
//   font-weight: bold;
//   color: ${theme.colors.black};
//   text-align: center;
//   margin: 0;
// `;

// const ProfileContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 1rem;
// `;

// const ProfileInfo = styled(Title1)`
//   display: flex;
//   align-items: center;
//   padding: 1rem;
//   gap: 1rem;
// `;

// const ProfileImage = styled.img`
//   width: 5rem;
//   height: 5rem;
//   border-radius: 50%;
//   object-fit: cover;
// `;

// const UserInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.25rem;
// `;

// const UserName = styled.span`
//   font-size: 1.125rem;
//   font-weight: ${theme.typography.weights.bold};
//   color: ${theme.colors.black};
// `;

// const UserBio = styled.span`
//   font-size: 0.875rem;
//   color: ${theme.colors.gray[500]};
// `;

// const ContentContainer = styled.div`
//   padding: 0.5rem 1.5rem 5rem 1.5rem;
// `;

// const ContentGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
//   gap: 1rem;
// `;

// const MyPage = () => {
//   const tabs: Tab[] = [
//     { id: 'recipes', label: '내 레시피' },
//     { id: 'bookmarks', label: '북마크' },
//     { id: 'comments', label: '내 댓글' },
//   ];

//   const [activeTab, setActiveTab] = useState(tabs[0].id);

//   // 샘플 레시피 데이터
//   const sampleRecipes = [
//     {
//       id: '1',
//       title: '초간단 1분 라면',
//       ramen: { id: 1, name: '진라면' },
//       date: '2024-01-01',
//       likes: 42,
//       imageUrl: sampleImage,
//     },
//     {
//       id: '2',
//       title: '매운 불닭 라면',
//       ramen: { id: 2, name: '불닭볶음면' },
//       date: '2024-01-02',
//       likes: 28,
//       imageUrl: sampleImage,
//     },
//     {
//       id: '3',
//       title: '초간단 1분 라면',
//       ramen: { id: 1, name: '진라면' },
//       date: '2024-01-01',
//       likes: 42,
//       imageUrl: sampleImage,
//     },
//     {
//       id: '4',
//       title: '매운 불닭 라면',
//       ramen: { id: 2, name: '불닭볶음면' },
//       date: '2024-01-02',
//       likes: 28,
//       imageUrl: sampleImage,
//     },
//   ];

//   // 샘플 댓글 데이터
//   const sampleComments = [
//     {
//       id: '1',
//       recipeId: '1',
//       content: '정말 맛있어 보이네요!',
//       createdAt: '2024-01-01',
//       recipeName: '초간단 1분 라매이',
//     },
//     {
//       id: '2',
//       recipeId: '2',
//       content: '이 레시피 꼭 따라해볼게요',
//       createdAt: '2024-01-02',
//       recipeName: '매운 불닭 라면',
//     },
//   ];

//   const handleRecipeClick = (id: string) => {
//     console.log('Recipe clicked:', id);
//   };

//   const handleLogout = () => {
//     console.log('로그아웃');
//   };

//   const handleTabChange = (tabId: string) => {
//     setActiveTab(tabId);
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'recipes':
//         return (
//           <ContentGrid>
//             {sampleRecipes.map((recipe) => (
//               <MyRecipeCard
//                 key={recipe.id}
//                 id={recipe.id}
//                 title={recipe.title}
//                 ramen={recipe.ramen}
//                 date={recipe.date}
//                 likes={recipe.likes}
//                 imageUrl={recipe.imageUrl}
//               />
//             ))}
//           </ContentGrid>
//         );
//       case 'comments':
//         return <MyCommentList comments={sampleComments} />;
//       // case 'bookmarks':
//       //   return <RamenList recipes={sampleBookmarks} onRecipeClick={handleRecipeClick} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Container>
//       <Header>
//         <BackButton />
//         <Title>마이페이지</Title>
//       </Header>

//       <ProfileContainer>
//         <ProfileInfo>
//           <ProfileImage src={sampleImage} alt="프로필 이미지" />
//           <UserInfo>
//             <UserName>백종원</UserName>
//             <UserBio>라면왕이 되고 싶어</UserBio>
//           </UserInfo>
//         </ProfileInfo>
//         <ProfileSettingsButton onLogout={handleLogout} />
//       </ProfileContainer>

//       <TabNavigation tabs={tabs} defaultActiveTab="recipes" onTabChange={handleTabChange} />

//       <ContentContainer>{renderContent()}</ContentContainer>
//       <Footer />
//     </Container>
//   );
// };

// export default MyPage;
