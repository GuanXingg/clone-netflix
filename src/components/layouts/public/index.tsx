import { withErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '~/components/error-fallback';
import Footer from '~/layouts/footer';
import Header from '~/layouts/header';
import styles from './index.module.scss';

interface PublicLayoutProps {
  children: React.ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}

export default withErrorBoundary(PublicLayout, {
  FallbackComponent: ErrorFallback,
});
