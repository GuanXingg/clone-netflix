import { Route, Routes } from 'react-router-dom';
import AuthFeatures from '~/features/auth';
import PublicFeatures from '~/features/public';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<PublicFeatures />} />
      <Route path="/auth/*" element={<AuthFeatures />} />
    </Routes>
  );
}

export default MainRoutes;
