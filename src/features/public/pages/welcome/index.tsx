import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cs = classnames.bind(styles);

function Welcome() {
  return (
    <section className="theme-public">
      <section className={cs('heading')}>
        <h1 className={cs('title')}>Unlimited movies, TV shows, and more.</h1>
        <h2 className={cs('sub')}>Watch anywhere. Cancel anytime.</h2>
      </section>
    </section>
  );
}

export default Welcome;
