import classNames from 'classnames/bind';
import styles from './index.module.scss';

const cs = classNames.bind(styles);

interface ErrorFallbackProps {
  error: Error;
}

function ErrorFallback({ error }: ErrorFallbackProps) {
  return (
    <div className={cs('error')}>
      <p className={cs('title')}>Something went wrong:</p>
      <p className={cs('message')}>
        <span className={cs('name')}>({error.name}):</span>
        {error.message}
      </p>
    </div>
  );
}

export default ErrorFallback;
