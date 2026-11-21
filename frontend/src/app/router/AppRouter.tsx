import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeMapPage } from '../../pages/HomeMapPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeMapPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
