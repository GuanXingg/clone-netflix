import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PublicLayout from '~/components/layouts/public';
import WelcomePage from './pages/welcome';

function PublicFeatures() {
  const location = useLocation();

  useEffect(() => {
    const getPathname = location.pathname;

    if (getPathname === '/') document.title = 'Netflix - Welcome';
    else document.title = 'Netflix';
  }, [location]);

  return (
    <PublicLayout>
      <Routes>
        <Route path="" element={<WelcomePage />} />
      </Routes>
    </PublicLayout>
  );
}

export default PublicFeatures;
