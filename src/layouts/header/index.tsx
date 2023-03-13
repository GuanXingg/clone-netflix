import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BarsIcon } from '~/components/icons';
import { LogoFull, LogoSymbol } from '~/components/logo';
import styles from './index.module.scss';

const cs = classNames.bind(styles);

interface HeaderMobileProps {
  toggleMobile: boolean;
  setToggleMobile: React.Dispatch<React.SetStateAction<boolean>>;
}
interface HeaderNavLeftProps {
  isMobile: boolean;
  setToggleMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

const checkMobile = () => {
  const getWindowWidth = window.innerWidth;
  if (getWindowWidth < 768) return true;
  return false;
};

const checkScroll = () => {
  const getCoordinateY = window.scrollY;
  if (getCoordinateY >= 100) return true;
  return false;
};

function Header() {
  const [isMobile, setMobile] = useState<boolean>(() => checkMobile());
  const [isScroll, setScroll] = useState<boolean>(() => checkScroll());
  const [toggleNavMobile, setToggleNavMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleMobile = () => {
      setMobile(checkMobile);
    };

    window.addEventListener('resize', handleMobile);
    return () => window.removeEventListener('resize', handleMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(checkScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cs('header', {
          'header--scroll': isScroll,
        })}
      >
        <div className="lib-grid layout-wide">
          <div className={cs('lib-row', 'row')}>
            <HeaderNavLeft isMobile={isMobile} setToggleMobile={setToggleNavMobile} />
            <HeaderNavRight />
          </div>
        </div>
      </header>
      <HeaderMobile toggleMobile={toggleNavMobile} setToggleMobile={setToggleNavMobile} />
    </>
  );
}

// ========== Split Child Component ==========
const HeaderNavLeft = ({ isMobile, setToggleMobile }: HeaderNavLeftProps) => {
  return (
    <div className={cs('left')}>
      <button type="button" onClick={() => setToggleMobile(true)} className={cs('bars')}>
        <BarsIcon size={25} />
      </button>
      <a href="/">{isMobile ? <LogoSymbol width={35} /> : <LogoFull width={135} />}</a>
    </div>
  );
};

const HeaderNavRight = () => {
  return (
    <div className="right">
      <section className={cs('auth')}>
        <a href="/auth/login" className={cs('auth__link')}>
          Login
        </a>
        <a href="/auth/register" className={cs('auth__link', 'auth__link--register')}>
          Register
        </a>
      </section>
    </div>
  );
};

const HeaderMobile = ({ toggleMobile, setToggleMobile }: HeaderMobileProps) => {
  return (
    <>
      {toggleMobile && <section onClick={() => setToggleMobile(false)} className={cs('overlay')}></section>}
      <section
        className={cs('nav-mobile', {
          'nav-mobile--active': toggleMobile,
        })}
      >
        <a href="/" className={cs('nav-mobile__logo')}>
          <LogoFull width={135} />
        </a>
        <section className={cs('nav-mobile__func')}>
          <a href="/auth/login" className={cs('nav-mobile__link', 'nav-mobile__link--login')}>
            Login
          </a>
          <a href="/auth/register" className={cs('nav-mobile__link', 'nav-mobile__link--register')}>
            Register
          </a>
        </section>
      </section>
    </>
  );
};
export default Header;
