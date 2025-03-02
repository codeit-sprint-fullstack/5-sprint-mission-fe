import Image from "next/image";
import facebookIcon from "../../assets/icons/ic_facebook.svg";
import instagramIcon from "../../assets/icons/ic_instagram.svg";
import twitterIcon from "../../assets/icons/ic_twitter.svg";
import youtubeIcon from "../../assets/icons/ic_youtube.svg";

export default function Footer() {
  return (
    <footer className="bg-black w-full h-[160px] px-4 py-8">
      <div className="flex justify-between items-center max-w-[1120px] mx-auto">
        <CompanyName />
        {/* 모바일 버전에서는 회사 이름이 아래로 가야함. */}
        {/* <div className="flex w-3/5 justify-between"> */}
        <PolicyMenu />
        <SnsMenu />
        {/* </div> */}
      </div>
    </footer>
  );
}

// 회사
function CompanyName() {
  return <p className="text-base text-[#9CA3AF]">©codeit - 2024</p>;
}

// 정책 메뉴
function PolicyMenu() {
  return (
    <div className="flex text-[#E5E7EB] gap-7">
      <p>Privacy Policy</p>
      <p>FAQ</p>
    </div>
  );
}

// SNS 메뉴
function SnsMenu() {
  return (
    <div className="flex gap-4">
      <Image src={facebookIcon} alt="facebook" />
      <Image src={instagramIcon} alt="instagram" />
      <Image src={twitterIcon} alt="twitter" />
      <Image src={youtubeIcon} alt="youtube" />
    </div>
  );
}
