import DetailPage from '@/pages/DetailPage';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage';
import PostPage from '@/pages/PostPage';
import SearchPage from '@/pages/SearchPage';
import EditProfile from '@/pages/EditProfile';
import WithdrawPage from '@/pages/WithdrawPage';
import { Routes, Route } from 'react-router-dom';
import RamenWorldCupStartPage from '@/pages/RamenWorldCup/RamenWorldCupStartPage';
import RamenWorldCupGamePage from '@/pages/RamenWorldCup/RamenWorldCupGamePage';
import RamenWorldCupResultPage from '@/pages/RamenWorldCup/RamenWorldCupResultPage';
import RamenWorldCupRankingPage from '@/pages/RamenWorldCup/RamenWorldCupRankingPage';
import { SignupPage } from '@/pages/SignUpPage';

export default function Router() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/ramenworldcup" element={<RamenWorldCupStartPage />} />
        <Route path="/ramenworldcup/game" element={<RamenWorldCupGamePage />} />
        <Route path="/ramenworldcup/result" element={<RamenWorldCupResultPage />} />
        <Route path="/ramenworldcup/rank" element={<RamenWorldCupRankingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
      </Route>
    </Routes>
  );
}
