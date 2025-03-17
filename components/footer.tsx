import Image from "next/image";
import Link from "next/link";
export default function Footer() {
  return (
    <div>
      <footer>
        <div id="footer_top">
          <div id="footer_top_max">
            <div id="footer_top_text">
              <p>
                믿을 수 있는
                <br />
                판다마켓 중고거래
              </p>
            </div>
            <img id="footer_top_img" src="/img/Img_home_bottom.png" alt="" />
          </div>
        </div>
        <div id="footer_bottom">
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
              <Link href={"https://www.facebook.com/"}>
                <Image
                  src={"/assets/ic_facebook.svg"}
                  alt={"headerPandaImg"}
                  width={153}
                  height={51}
                />
              </Link>
              <address id="facebook"></address>{" "}
              <Link href={"https://www.facebook.com/"}>
                <Image
                  src={"/assets/ic_facebook.svg"}
                  alt={"headerPandaImg"}
                  width={153}
                  height={51}
                />
              </Link>
              <address id="twitter"></address>{" "}
              <Link href={"https://www.facebook.com/"}>
                <Image
                  src={"/assets/ic_facebook.svg"}
                  alt={"headerPandaImg"}
                  width={153}
                  height={51}
                />
              </Link>
              <address id="yotube"></address>{" "}
              <Link href={"https://www.facebook.com/"}>
                <Image
                  src={"/assets/ic_facebook.svg"}
                  alt={"headerPandaImg"}
                  width={153}
                  height={51}
                />
              </Link>
              <address id="instagram"></address>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
