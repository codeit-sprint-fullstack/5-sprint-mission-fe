import pandaMarketLogoImg from '../assets/panda_market_logo.png';
import loginButtonImg from '../assets/login_button.png';
import mobileMenu from '../assets/mobile_menu.png'
import '../styles/Navigation.css';
import mobileLogoImg from '../assets/mobile_logo.png';

export function Navigation({windowWidth}) {
  return (
    <>
      <div className={windowWidth >= 1200? 'navigation':'navigationMobile'}>
        <div className="logoAndMenus">
          <img src={windowWidth < 744? mobileLogoImg:pandaMarketLogoImg} />
          <div className="navigationMenus">
            <div>자유게시판</div>
            <div>중고마켓</div>
          </div>
        </div>
        <img className="loginButton" src={windowWidth >= 1200? loginButtonImg:mobileMenu} />
      </div>
      <hr className="line" />
    </>
  );
}
