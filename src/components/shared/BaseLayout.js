import Image from "next/image";
import Link from "next/link";
import LogoImg from "@images/logo-image/mainLogo.png";
import LogoText from "@images/logo-image/mainText.png";
import UserBaseIcon from "@images/user-icon/ic_profile.png";
import Footer from "./Footer";
import { useAuth } from "@/core/contexts/AuthContext";
import { useRouter } from "next/router";

export default function BaseLayout({ children }) {
  const { user, logout, setRedirectUrl } = useAuth();
  const router = useRouter();

  const handleLoginRedirect = () => {
    setRedirectUrl(router.asPath);
    router.push("/auth/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-8 xl:px-96 border-b bg-white border-gray-200 z-50">
        <Link className="flex gap-3" href={"/"}>
          <Image src={LogoImg} alt="판다마켓 홈" className="w-10 max-sm:w-0" />
          <Image
            src={LogoText}
            alt="판다마켓 홈"
            className="w-28 object-contain"
          />
        </Link>

        {user ? (
          <div className="flex items-center gap-3.5">
            <div
              className="flex items-center gap-1
          "
            >
              <Image
                src={UserBaseIcon}
                alt="User Icon"
                className="w-8 h-8 rounded-full"
              />
              <p>{user.nickname}님</p>
            </div>
            <button
              onClick={logout}
              className="bg-custom-color-blue text-sm text-white font-semibold rounded-lg px-4 py-2"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className="bg-custom-color-blue text-white font-semibold rounded-lg px-4 py-2 "
          >
            로그인
          </button>
        )}
      </header>

      <main>{children}</main>
      <Footer />
    </>
  );
}
