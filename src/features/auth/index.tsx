import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PublicLayout from '~/components/layouts/public';
import RegisterPage from './pages/register';

function AuthFeatures() {
  const location = useLocation();

  useEffect(() => {
    const getPathname = location.pathname;

    if (getPathname === '/auth/register') document.title = 'Netflix - Register';
    else document.title = 'Netflix';
  }, [location]);

  return (
    <PublicLayout>
      <Routes>
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </PublicLayout>
  );
}

export default AuthFeatures;
