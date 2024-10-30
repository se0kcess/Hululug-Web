import DetailPage from '@/pages/DetailPage';
import MainPage from '@/pages/MainPage';
import { Routes, Route } from 'react-router-dom';

export default function Router() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}
