import Image from "next/image";
import facebookIcon from "@/assets/images/ic-facebook.svg";
import twitterIcon from "@/assets/images/ic-twitter.svg";
import youtubeIcon from "@/assets/images/ic-youtube.svg";
import instagramIcon from "@/assets/images/ic-instagram.svg";

const socialIcons = [
  { src: facebookIcon, alt: "facebook" },
  { src: twitterIcon, alt: "twitter" },
  { src: youtubeIcon, alt: "youtube" },
  { src: instagramIcon, alt: "instagram" },
];

const FooterLink = ({ text }) => (
  <span className="text-gray-200 cursor-pointer hover:text-gray-100 transition-colors">
    {text}
  </span>
);

const SocialIcons = () => (
  <div className="flex items-center gap-[12px]">
    {socialIcons.map((icon) => (
      <Image
        key={icon.alt}
        src={icon.src}
        alt={icon.alt}
        width={24}
        height={24}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
    ))}
  </div>
);

function Footer() {
  return (
    <footer className="pt-[32px] pb-[65px] px-[16px] xl:px-[400px] h-[160px] bg-gray-900 w-full">
      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col gap-[24px]">
        <div className="flex justify-between">
          <div className="flex items-center gap-[30px]">
            <FooterLink text="Privacy Policy" />
            <FooterLink text="FAQ" />
          </div>
          <SocialIcons />
        </div>
        <span className="text-gray-400">©codeit - 2024</span>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between">
        <span className="text-gray-400">©codeit - 2024</span>
        <div className="flex items-center gap-[30px]">
          <FooterLink text="Privacy Policy" />
          <FooterLink text="FAQ" />
        </div>
        <SocialIcons />
      </div>
    </footer>
  );
}

export default Footer;
