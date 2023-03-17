import classnames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { BarsIcon } from '~/components/icons';
import { LogoFull, LogoSymbol } from '~/components/logo';
import styles from './index.module.scss';

const cs = classnames.bind(styles);

interface HeaderProps {
  toggleMobile: boolean;
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
            <HeaderLeftNav toggleMobile={isMobile} setToggleMobile={setToggleNavMobile} />
            <HeaderRightNav />
          </div>
        </div>
      </header>
      <HeaderMobile toggleMobile={toggleNavMobile} setToggleMobile={setToggleNavMobile} />
    </>
  );
}

// ========== Split Child Components ==========
const HeaderLeftNav = ({ toggleMobile, setToggleMobile }: HeaderProps) => {
  return (
    <div className={cs('left')}>
      <button type="button" onClick={() => setToggleMobile(true)} className={cs('bars')}>
        <BarsIcon size={25} />
      </button>
      <a href="/">{toggleMobile ? <LogoSymbol width={35} /> : <LogoFull width={135} />}</a>
    </div>
  );
};

const HeaderRightNav = () => {
  return (
    <section className={cs('right')}>
      <a href="/auth/login" className={cs('auth')}>
        Login
      </a>
      <a href="/auth/register" className={cs('auth', 'auth--register')}>
        Register
      </a>
    </section>
  );
};

const HeaderMobile = ({ toggleMobile, setToggleMobile }: HeaderProps) => {
  return (
    <>
      {toggleMobile && <section onClick={() => setToggleMobile(false)} className={cs('overlay')}></section>}
      <section
        className={cs('mobile', {
          'mobile--active': toggleMobile,
        })}
      >
        <a href="/" className={cs('mobile__logo')}>
          <LogoFull width={135} />
        </a>
        <section className={cs('mobile__auth')}>
          <a href="/auth/login" className={cs('mobile__link', 'mobile__link--login')}>
            Login
          </a>
          <a href="/auth/register" className={cs('mobile__link', 'mobile__link--register')}>
            Register
          </a>
        </section>
      </section>
    </>
  );
};

export default Header;
