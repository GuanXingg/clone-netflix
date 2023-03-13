import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '~/components/error-fallback';
import Footer from '~/layouts/footer';
import Header from '~/layouts/header';

interface PublicLayoutProps {
  children: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <main className="main" style={{ flex: '1' }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default withErrorBoundary(PublicLayout, {
  FallbackComponent: ErrorFallback,
});
