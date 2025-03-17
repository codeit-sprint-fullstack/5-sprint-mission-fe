import KakaoIcon from "@public/Img/login-icon/kakaoIcon.png";
import GoogleIcon from "@public/Img/login-icon/googleIcon.png";
import Image from "next/image";
import Link from "next/link";

export default function EasySignup() {
  return (
    <>
      <div className="flex flex-col w-[343px] md:w-[640px] rounded-lg gap-6">
        <section className="flex justify-between items-center w-[343px] md:w-[640px] rounded-lg bg-custom-color-bg-cool-blue py-4 px-6">
          <p className="text-base font-medium text-custom-text-black-800">
            간편 로그인하기
          </p>
          <div className="flex gap-4">
            <Link href={"https://www.google.com"}>
              <Image
                src={GoogleIcon}
                alt="구글 로그인"
                className="w-10 object-contain"
              />
            </Link>

            <Link href={"https://www.kakaocorp.com"}>
              <Image
                src={KakaoIcon}
                alt="카카오톡 로그인"
                className="w-10 object-contain"
              />
            </Link>
          </div>
        </section>

        <section className="flex justify-center gap-1">
          <p className="text-sm font-medium text-custom-text-black-800">
            이미 회원이신가요?
          </p>
          <Link
            href={"/auth/login"}
            className="text-sm font-medium text-custom-color-blue underline"
          >
            로그인
          </Link>
        </section>
      </div>
    </>
  );
}
