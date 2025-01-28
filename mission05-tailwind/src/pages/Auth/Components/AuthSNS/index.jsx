import kakao from "../../../../assets/sns-login/kakao.png";
import google from "../../../../assets/sns-login/google.png";
import { useLocation } from "react-router-dom";

export default function AuthSNS() {
  const loc = useLocation();

  return (
    <div className="flex justify-between items-center py-[16px] px-[24px] my-[24px] bg-[#E6F2FF] rounded-[8px]">
      <p className="text-[#1F2937] text-[1rem] leading-[24px] font-medium">
        {loc.pathname.split("/")[1] === "login"
          ? "간편 로그인"
          : "간편 회원가입"}
      </p>
      <div className="flex gap-[16px]">
        <img
          src={google}
          alt="구글 로그인"
          className="w-[42px] h-[42px] hover:cursor-pointer"
        />
        <img
          src={kakao}
          alt="카카오 로그인"
          className="w-[42px] h-[42px] hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
