import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '@/styles/theme';
import MyRecipeCard from '@/components/MyPage/MyRecipeCard/MyRecipeCard';
import MyCommentList from '@/components/MyPage/MyCommentList/MyCommentList';
import BackButton from '@/components/common/BackButton/BackButton';
import ProfileSettingsButton from '@/components/MyPage/ProfileSettingsButton/ProfileSettingsButton';
import { TabNavigation } from '@/components/MyPage/TabNavigation/TabNavigation';
import { Title1 } from '@/styles/Typography';
import Footer from '@/components/common/Footer/Footer';
import { axiosInstance } from '@/utils/axios';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types/auth';
import { authApi } from '@/api/auth';

interface RecipePreview {
  _id: string;
  recipe_id: string;
  title: string;
  thumbnail: string;
  tags: string[];
  writer: string;
  likes: number;
  created_at: string;
}

interface CommentInfo {
  _id: string;
  recipe_id: string;
  writer: string;
  content: string;
  created_at: string;
  updated_at: string;
  recipe_title: string;
}

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

const Container = styled.div`
  margin: 0 auto;
  min-height: 100vh;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
  padding: 1rem;
`;

const Title = styled(Title1)`
  font-weight: bold;
  color: ${theme.colors.black};
  text-align: center;
  margin: 0;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const ProfileInfo = styled(Title1)`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

const ProfileImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const UserName = styled.span`
  font-size: 1.125rem;
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.black};
`;

const UserBio = styled.span`
  font-size: 0.875rem;
  color: ${theme.colors.gray[500]};
`;

const ContentContainer = styled.div`
  padding: 0.5rem 1.5rem 5rem 1.5rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1rem;
`;

const MyPage = () => {
  const [recipes, setRecipes] = useState<RecipePreview[]>([]);
  const [bookmarks, setBookmarks] = useState<RecipePreview[]>([]);
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('recipes');
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const navigate = useNavigate();

  const tabs = [
    { id: 'recipes', label: '내 레시피' },
    { id: 'bookmarks', label: '북마크' },
    { id: 'comments', label: '내 댓글' },
  ];

  // 내 레시피 조회
  const fetchMyRecipes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response =
        await axiosInstance.get<ApiResponse<{ recipe_preview: RecipePreview[] }>>('/users/recipes');
      setRecipes(response.data.data.recipe_preview);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setError('레시피를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 북마크 조회
  const fetchBookmarks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response =
        await axiosInstance.get<ApiResponse<{ recipe_preview: RecipePreview[] }>>(
          '/users/bookmark',
        );
      setBookmarks(response.data.data.recipe_preview);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      setError('북마크를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 내 댓글 조회
  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response =
        await axiosInstance.get<ApiResponse<{ comments: CommentInfo[] }>>('/users/comments');
      setComments(response.data.data.comments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setError('댓글을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 인증 체크 및 프로필 로드
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.checkAuth();
        if (response.data) {
          setUserProfile(response.data);
          // 프로필 로드 후 첫 탭의 데이터 로드
          fetchMyRecipes();
        }
      } catch (error) {
        navigate('/login', {
          replace: true,
          state: { from: '/mypage' },
        });
      }
    };

    checkAuth();
  }, [navigate]);

  // 탭 변경시 데이터 로드
  useEffect(() => {
    if (!userProfile) return; // 프로필이 로드되지 않았다면 데이터를 가져오지 않음

    switch (activeTab) {
      case 'recipes':
        fetchMyRecipes();
        break;
      case 'bookmarks':
        fetchBookmarks();
        break;
      case 'comments':
        fetchComments();
        break;
    }
  }, [activeTab, userProfile]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    // TODO: 실제 로그아웃 처리 구현
    console.log('로그아웃 되었습니다');
  };

  return (
    <Container>
      <Header>
        <BackButton />
        <Title>마이페이지</Title>
        <div />
      </Header>

      {isLoading && !userProfile ? (
        <div>로딩 중...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <ProfileContainer>
            <ProfileInfo>
              <ProfileImage
                src={userProfile?.profile_image}
                alt={`${userProfile?.nickname}의 프로필 이미지`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/default-profile.png';
                }}
              />
              <UserInfo>
                <UserName>{userProfile?.nickname}</UserName>
                <UserBio>{userProfile?.introduce || '소개글이 없습니다.'}</UserBio>
              </UserInfo>
            </ProfileInfo>
            <ProfileSettingsButton onLogout={handleLogout} />
          </ProfileContainer>

          <TabNavigation tabs={tabs} defaultActiveTab={activeTab} onTabChange={handleTabChange} />

          <ContentContainer>
            {isLoading ? (
              <div>데이터를 불러오는 중...</div>
            ) : (
              <>
                {activeTab === 'recipes' && (
                  <ContentGrid>
                    {recipes.map((recipe) => (
                      <MyRecipeCard
                        key={recipe._id}
                        id={recipe.recipe_id}
                        title={recipe.title}
                        imageUrl={recipe.thumbnail}
                        date={recipe.created_at}
                        likes={recipe.likes}
                        tags={recipe.tags}
                      />
                    ))}
                  </ContentGrid>
                )}

                {activeTab === 'bookmarks' && (
                  <ContentGrid>
                    {bookmarks.map((recipe) => (
                      <MyRecipeCard
                        key={recipe._id}
                        id={recipe.recipe_id}
                        title={recipe.title}
                        imageUrl={recipe.thumbnail}
                        date={recipe.created_at}
                        likes={recipe.likes}
                        tags={recipe.tags}
                      />
                    ))}
                  </ContentGrid>
                )}

                {activeTab === 'comments' && (
                  <MyCommentList
                    comments={comments.map((comment) => ({
                      id: comment._id,
                      recipeId: comment.recipe_id,
                      content: comment.content,
                      createdAt: comment.created_at,
                      recipeName: comment.recipe_title,
                    }))}
                  />
                )}
              </>
            )}
          </ContentContainer>
        </>
      )}

      <Footer />
    </Container>
  );
};

export default MyPage;
