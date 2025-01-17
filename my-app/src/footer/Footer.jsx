import "./footer.css";
export function Footer() {
  return (
    <div id="footer">
      <div id="footer_bottom_contents">
        <div id="footer_copyright">
          <p>©codeit - 2024</p>
        </div>
        <div id="footer_faq">
          <a href="privacy/">
            <p>Privacy Policy</p>
          </a>
          <a href="faq/">
            <p>FAQ</p>
          </a>
        </div>
        <div id="footer_ad">
          <a target="_blank" href="https://www.facebook.com/">
            <img src={"/img/ic_facebook.png"}></img>
          </a>
          <a target="_blank" href="https://x.com/">
            <img src={"/img/ic_twitter.png"}></img>
          </a>
          <a target="_blank" href="https://www.youtube.com/">
            <img src={"/img/ic_youtube.png"}></img>
          </a>
          <a target="_blank" href="https://www.instagram.com/">
            <img src={"/img/ic_instagram.png"}></img>
          </a>
        </div>
      </div>
      <div id="footer_bottom_contents_mobile">
        <div id="footer_faq">
          <a href="privacy/">
            <p>Privacy Policy</p>
          </a>
          <a href="faq/">
            <p>FAQ</p>
          </a>
        </div>
        <div id="footer_ad">
          <a target="_blank" href="https://www.facebook.com/">
            <img src={"/img/ic_facebook.png"}></img>
          </a>
          <a target="_blank" href="https://x.com/">
            <img src={"/img/ic_twitter.png"}></img>
          </a>
          <a target="_blank" href="https://www.youtube.com/">
            <img src={"/img/ic_youtube.png"}></img>
          </a>
          <a target="_blank" href="https://www.instagram.com/">
            <img src={"/img/ic_instagram.png"}></img>
          </a>
        </div>
        <div id="footer_copyright">
          <p>©codeit - 2024</p>
        </div>
      </div>
    </div>
  );
}
