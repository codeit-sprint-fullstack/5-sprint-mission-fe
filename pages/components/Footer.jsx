import Image from "next/image";
import Link from "next/link";
import facebookImg from "../../assets/facebook.png";
import twitterImg from "../../assets/twitter.png";
import youtubeImg from "../../assets/Group.png";
import instagramImg from "../../assets/instagram.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-10 pb-[108px]">
      <div className="max-w-screen-xl mx-auto px-6  flex justify-between items-center">
        <p className="text-sm">©codeit-2024</p>

        <div className="flex gap-6 text-sm">
          <Link href="/privacy-policy" className="hover:text-gray-200">
            Privacy Policy
          </Link>
          <Link href="/faq" className="hover:text-gray-200">
            FAQ
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link href="https://www.facebook.com" target="_blank">
            <Image src={facebookImg} alt="Facebook" width={24} height={24} />
          </Link>
          <Link href="https://www.twitter.com" target="_blank">
            <Image src={twitterImg} alt="Twitter" width={24} height={24} />
          </Link>
          <Link href="https://www.youtube.com" target="_blank">
            <Image src={youtubeImg} alt="YouTube" width={24} height={24} />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <Image src={instagramImg} alt="Instagram" width={24} height={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
