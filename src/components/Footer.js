import "../App.css";
import facebookimg from "../assets/facebook.png";
import twitterimg from "../assets/twitter.png";
import youtubeimg from "../assets/Group.png";
import intagramimg from "../assets/instagram.png";

function Footer() {
  return (
    <>
      <div class="tailmen">
        <div class="tailsec">
          <nav class="tail-nav">
            <li>@codeit-2024</li>
            <li>
              <a href="./">Privacy Policy</a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="./">FAQ</a>
            </li>
            <li class="frame">
              <a href="https://www.facebook.com">
                <img src={facebookimg} />
              </a>
              <a href="https://www.twitter.com">
                <img src={twitterimg} />
              </a>
              <a href="https://www.youtube.com">
                <img src={youtubeimg} />
              </a>
              <a href="https://www.instagram.com">
                <img src={intagramimg} />
              </a>
            </li>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Footer;
