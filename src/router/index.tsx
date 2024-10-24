import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';

export default function Router() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
