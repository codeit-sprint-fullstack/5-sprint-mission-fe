import Link from "next/link";
import Image from "next/image";
import iconFacebook from "@/assets/icons/ic_facebook.png";
import iconX from "@/assets/icons/ic_X.png";
import iconYoutube from "@/assets/icons/ic_youtube.png";
import iconInstagram from "@/assets/icons/ic_instagram.png";

const snsList = [
  {
    name: "Facebook",
    src: iconFacebook,
    href: "https://www.facebook.com/?locale=ko_KR",
  },
  {
    name: "X",
    src: iconX,
    href: "https://x.com/i/flow/login?lang=ko",
  },
  { name: "Youtube", src: iconYoutube, href: "https://www.youtube.com/" },
  { name: "Instagram", src: iconInstagram, href: "https://www.instagram.com/" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-8 pb-28">
      <div className="max-w-7xl px-4 md:px-6 mx-auto flex flex-wrap gap-4 md:items-center justify-between">
        <p className="text-gray-400 font-normal text-base leading-5 order-3 md:order-1">
          <span translate="no">©Codeit</span> - 2025
        </p>

        <div className="text-gray-200 flex gap-7 order-1 md:order-2">
          <p>Privacy Policy</p>
          <p>FAQ</p>
        </div>

        <div className="flex items-center gap-3 order-2 md:order-3">
          {snsList.map((sns) => (
            <Link
              key={sns.name}
              href={sns.href}
              target="_blank"
              rel="noreferrer noopoener"
            >
              <Image src={sns.src} alt={sns.name} width={20} height={20} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
