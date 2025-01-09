import Button from "../../components/Button";
import logoImage from "../../../assets/logo/logo-img.png";
import logoTitle from "../../../assets/logo/logo-title.png";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-300 sticky top-0 z-10">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between px-6 py-2 md:px-4">
        <section className="flex gap-6 tb:gap-5 md:gap-2">
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="판다마켓" className="w-10 h-10" />
            <img src={logoTitle} alt="판다마켓" className="w-auto h-9" />
          </div>
          <nav></nav>
        </section>

        <Button>로그인</Button>
      </div>
    </header>
  );
}
