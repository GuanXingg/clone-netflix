import classnames from 'classnames/bind';
import styles from './index.module.scss';

const cs = classnames.bind(styles);

const listItem = [
  'FAQ',
  'Help Center',
  'Account',
  'Media Center',
  'Investor Relations',
  'Jobs',
  'Ways to Watch',
  'Terms of Use',
  'Privacy',
  'Cookie Preferences',
  'Corporate Information',
  'Contact Us',
  'Speed Test',
  'Legal Notices',
  'Only on Netflix',
];

function Footer() {
  return (
    <footer className={cs('footer')}>
      <div className="lib-grid lib-wide">
        <p className={cs('contact')}>
          Question? <span className={cs('text-hover')}>Contact us</span>
        </p>
        <ul className={cs('list')}>
          {listItem.map((item) => {
            return (
              <li key={item}>
                <span className={cs('text-hover')}>{item}</span>
              </li>
            );
          })}
        </ul>
        <p className={cs('copyright')}>Netflix Vietnam</p>
      </div>
    </footer>
  );
}

export default Footer;
