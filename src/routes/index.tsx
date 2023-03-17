import { Route, Routes } from 'react-router-dom';
import PublicFeatures from '~/features/public';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<PublicFeatures />} />
    </Routes>
  );
}

export default MainRoutes;
