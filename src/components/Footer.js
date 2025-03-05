import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={clsx("bg-[#111827] h-40 px-4 md:px-6 py-8")}>
      <div
        className={clsx(
          "grid grid-cols-2 md:grid-cols-3 mx-auto max-w-7xl gap-y-6"
        )}
      >
        <div className="text-[#9CA3AF] text-base font-normal row-start-2 md:row-start-1">
          ©codeit - 2024
        </div>
        <div className="flex gap-[30px] md:justify-self-center">
          <Link href="/policy" className="text-base font-normal text-[#E5E7EB]">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-base font-normal text-[#E5E7EB]">
            FAQ
          </Link>
        </div>
        <div className="flex gap-3 justify-self-end">
          <Link href="https://www.facebook.com/" target="_blank">
            <div className="w-5 h-5 relative">
              <Image src="/ic_facebook.png" fill alt="" />
            </div>
          </Link>
          <Link href="https://x.com/home" target="_blank">
            <div className="w-5 h-5 relative">
              <Image src="/ic_twitter.png" fill alt="" />
            </div>
          </Link>
          <Link href="https://www.youtube.com/" target="_blank">
            <div className="w-5 h-5 relative">
              <Image src="/ic_youtube.png" fill alt="" />
            </div>
          </Link>
          <Link href="https://www.instagram.com/" target="_blank">
            <div className="w-5 h-5 relative">
              <Image src="/ic_instagram.png" fill alt="" />
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
