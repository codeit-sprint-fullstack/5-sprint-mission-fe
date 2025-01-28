import facebookIcon from "../../../assets/sns/ic_facebook.png";
import twitterIcon from "../../../assets/sns/ic_twitter.png";
import youtubeIcon from "../../../assets/sns/ic_youtube.png";
import instagramIcon from "../../../assets/sns/ic_instagram.png";

const SNS = {
  facebook: {
    img: facebookIcon,
    url: "https://www.facebook.com",
  },
  twitter: {
    img: twitterIcon,
    url: "https://x.com/i/flow/login",
  },
  youtube: {
    img: youtubeIcon,
    url: "https://www.youtube.com/",
  },
  instagram: {
    img: instagramIcon,
    url: "https://www.instagram.com/",
  },
};

const imageStyle = "w-[20px] h-[20px] hover:cursor-pointer";

const navigateTo = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

function FooterSNS({ type }) {
  return (
    <>
      <img
        className={imageStyle}
        src={SNS[type].img}
        alt={type}
        onClick={() => navigateTo(SNS[type].url)}
      />
    </>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-base font-normal leading-5 pt-[32px] pb-[108px]">
      <div className="w-full max-w-screen-xl mx-auto px-6 md:px-4 flex items-center justify-between flex-wrap">
        <div className="text-gray-400 md:order-3 md:mb-6">@codeit-2025</div>
        <nav className="flex gap-[30px] text-gray-200 hover:cursor-pointer md:order-1 md:mb-6">
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </nav>
        <section className="flex gap-3 md:order-2 md:mb-6">
          {Object.keys(SNS).map((type, index) => (
            <FooterSNS key={index} type={type} />
          ))}
        </section>
      </div>
    </footer>
  );
}
