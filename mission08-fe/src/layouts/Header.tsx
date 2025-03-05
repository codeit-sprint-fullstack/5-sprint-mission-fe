import pandaFace from "@/assets/images/panda-face.png";
import pandaMarket from "@/assets/images/panda-market.png";
import Image from "next/image";
import Button from "@/components/button/ButtonRectangle";
import NavBar from "@/components/header/Navbar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 border-b border-gray-200 backdrop-filter backdrop-blur-md sticky top-0 z-10">
      <div className="max-w-7xl px-4 md:px-6 flex items-center justify-between mx-auto">
        <section className="flex items-center gap-4 md:gap-9 xl:gap-12">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={pandaFace}
              alt="판다마켓"
              width={40}
              height={40}
              className="hidden md:block"
            />
            <Image src={pandaMarket} alt="판다마켓" width={103} height={35} />
          </Link>

          <NavBar />
        </section>

        <Link href="/login">
          <Button isActive={true}>로그인</Button>
        </Link>
      </div>
    </header>
  );
}
