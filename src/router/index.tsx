import DetailPage from '@/pages/DetailPage';
import MainPage from '@/pages/MainPage';
import MyPage from '@/pages/MyPage';
import PostPage from '@/pages/PostPage';
import SearchPage from '@/pages/SearchPage';
import { Routes, Route } from 'react-router-dom';

export default function Router() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<DetailPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}
