import Image from "next/image";
import Link from "next/link";
import LogoImg from "@images/logo-image/mainLogo.png";
import LogoText from "@images/logo-image/mainText.png";
import UserBaseIcon from "@images/user-icon/ic_profile.png";
import Footer from "./Footer";
import { useAuth } from "@/core/contexts/AuthContext";
import { useRouter } from "next/router";

export default function DetailLayout({ children }) {
  const { user, logout, setRedirectUrl } = useAuth();
  const router = useRouter();

  const handleLoginRedirect = () => {
    setRedirectUrl(router.asPath);
    router.push("/auth/login");
  };

  return (
    <>
      <div className="fixed flex justify-between items-center w-full py-[16px]  px-[14px] md:px-[24px] xl:px-[200px] bg-white border-b border-gray-300 z-10">
        <section className="flex mr-[23px] gap-[6px] md:gap-[20px] xl:gap-[32px] ">
          <Link href={"/"} className="flex  gap-3">
            <Image
              src={LogoImg}
              alt="market logo"
              className="w-[40px] hidden md:block"
            />
            <Image
              src={LogoText}
              alt="market text logo"
              className="w-[81px] md:w-[103px] object-contain"
            />
          </Link>

          <div className="flex text-lg gap-5  items-center">
            <Link
              href={"/article"}
              className="text-custom-color-blue text-lg font-bold text-nowrap"
            >
              자유게시판
            </Link>
            <button className="text-gray-600 text-lg font-bold text-nowrap">
              중고마켓
            </button>
          </div>
        </section>

        <section>
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
              className="bg-custom-color-blue text-white font-semibold rounded-lg px-8 py-3 "
            >
              로그인
            </button>
          )}
        </section>
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
}
