import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import sampleImage from '@/assets/ramyun-images/sample-3.png';
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
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<User | null>(null);

  const tabs = [
    { id: 'recipes', label: '내 레시피' },
    { id: 'bookmarks', label: '북마크' },
    { id: 'comments', label: '내 댓글' },
  ];

  const fetchUserProfile = async () => {
    try {
      const response = await authApi.checkAuth();
      if (response.data) {
        setUserProfile(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setError('프로필 정보를 불러오는데 실패했습니다.');
    }
  };

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

  useEffect(() => {
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
  }, [activeTab]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.checkAuth();
        if (response.data) {
          setIsAuthenticated(true);
          setUserProfile(response.data); // 인증 확인과 동시에 프로필 정보 설정
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    if (isLoading) {
      return <div>로딩 중...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    switch (activeTab) {
      case 'recipes':
        return (
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
        );
      case 'bookmarks':
        return (
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
        );
      case 'comments':
        return (
          <MyCommentList
            comments={comments.map((comment) => ({
              id: comment._id,
              recipeId: comment.recipe_id,
              content: comment.content,
              createdAt: comment.created_at,
              recipeName: comment.recipe_title,
            }))}
          />
        );
      default:
        return null;
    }
  };

  const handleLogout = () => {
    console.log('로그아웃 되었습니다');
  };

  return (
    <Container>
      <Header>
        <BackButton />
        <Title>마이페이지</Title>
      </Header>

      <ProfileContainer>
        <ProfileInfo>
          <ProfileImage
            src={userProfile?.profile_image || '/default-profile.png'}
            alt="프로필 이미지"
          />
          <UserInfo>
            <UserName>{userProfile?.nickname || '사용자'}</UserName>
            <UserBio>{userProfile?.introduce || '자기소개가 없습니다.'}</UserBio>
          </UserInfo>
        </ProfileInfo>
        <ProfileSettingsButton onLogout={handleLogout} />
      </ProfileContainer>

      <TabNavigation tabs={tabs} defaultActiveTab={activeTab} onTabChange={handleTabChange} />

      <ContentContainer>{renderContent()}</ContentContainer>
      <Footer />
    </Container>
  );
};

export default MyPage;
