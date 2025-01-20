import pandaMarketLogoImg from '../../assets/panda_market_logo.png';
import loginButtonImg from '../../assets/login_button.png';
import mobileMenu from '../../assets/mobile_menu.png';
import '../../styles/Navigation.css';
import mobileLogoImg from '../../assets/mobile_logo.png';
import { Link } from 'react-router-dom';

export function Navigation({ userEnv, pageFocus }) {
  return (
    <>
      <div
        className={userEnv === 'desktop' ? 'navigation' : 'navigationMobile'}
      >
        <div className="logoAndMenus">
          <Link to="/">
            <img
              src={userEnv === 'mobile' ? mobileLogoImg : pandaMarketLogoImg}
            />
          </Link>

          {(pageFocus === 'market' ||
            pageFocus === 'board' ||
            pageFocus === 'registration') && (
            <div className="navigationMenus">
              <div className='notNowPage'>
                자유게시판
              </div>
                  {
                    pageFocus === 'market' ? <div className='nowPage'>중고마켓</div>: <Link to="/items" style={{ textDecoration: "none" }}><div className='notNowPage'>중고마켓</div></Link>
                  }
            </div>
          )}
        </div>
        <img
          className="loginButton"
          src={userEnv === 'desktop' ? loginButtonImg : mobileMenu}
        />
      </div>
      <hr className="line" />
    </>
  );
}
