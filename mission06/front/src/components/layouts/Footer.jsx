import '../../styles/Footer.css';
import icFacebookImg from '../../assets/ic_facebook.png';
import icTwitterImg from '../../assets/ic_twitter.png';
import icYoutubeImg from '../../assets/ic_youtube.png';
import icInstagramImg from '../../assets/ic_instagram.png';

export function Footer({ userEnv }) {
  return (
    <div className="footerBackground">
      <div className="footerItems">
        <div
          className={
            userEnv === 'desktop'
              ? 'footer'
              : 'TabletFooter'
          }
        >
          {
            userEnv === 'mobile'? 
            <>
            <div className='mobileFooter'>
              <div className='links'>
              <div className="footerLinks">
              <div>Privacy Policy</div>
              <div>FAQ</div>
            </div>
            <div className="footerSocials">
              <div>
                <img src={icFacebookImg} />
              </div>
              <div>
                <img src={icTwitterImg} />
              </div>
              <div>
                <img src={icYoutubeImg} />
              </div>
              <div>
                <img src={icInstagramImg} />
              </div>
            </div>
              </div>
            <div className="mobileFooterCopyright">ⓒcodeit - 2024</div>
            </div>
            </>
            :
            <>
            <div className="footerCopyright">ⓒcodeit - 2024</div>
            <div className="footerLinks">
              <div>Privacy Policy</div>
              <div>FAQ</div>
            </div>
            <div className="footerSocials">
              <div>
                <img src={icFacebookImg} />
              </div>
              <div>
                <img src={icTwitterImg} />
              </div>
              <div>
                <img src={icYoutubeImg} />
              </div>
              <div>
                <img src={icInstagramImg} />
              </div>
            </div>
            </>
          }
          </div>
      </div>
    </div>
  );
}
