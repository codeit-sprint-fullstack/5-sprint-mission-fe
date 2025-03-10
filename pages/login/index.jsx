"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 이메일 입력 변경 핸들러
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValidEmail(emailRegex.test(e.target.value));
  };

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsValidPassword(e.target.value.length >= 8);
  };

  //  로그인 요청 함수
  const handleLogin = async () => {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      setIsModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`,
        { email, password }
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      router.push("/");
    } catch (err) {
      console.error("로그인 실패:", err.response?.data?.message || err.message);
      setErrorMessage(err.response?.data?.message || "로그인에 실패했습니다.");
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enter 키 입력 시 로그인 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isDisabled && !isSubmitting) {
      handleLogin();
    }
  };

  const isDisabled = !email || !password || !isValidEmail || !isValidPassword;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-between mt-[120px] gap-6 w-[640px]">
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/loginpandalogo.png"
              alt="user icon"
              width={396}
              height={132}
            />
          </Link>
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">이메일</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={`w-full p-4 px-6 border-2 box-border rounded-lg bg-gray-100 text-lg leading-6 focus:outline-none ${
              isValidEmail
                ? "border-transparent focus:ring-2 focus:ring-blue-500"
                : "border-red-500"
            }`}
            placeholder="이메일을 입력해주세요"
          />
        </div>

        <div className="relative flex flex-col">
          <label className="text-lg font-bold mb-2">비밀번호</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
              className={`w-full p-4 px-6 pr-12 border-2 box-border rounded-lg bg-gray-100 text-lg leading-6 focus:outline-none ${
                isValidPassword
                  ? "border-transparent focus:ring-2 focus:ring-blue-500"
                  : "border-red-500"
              }`}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 inset-y-0 my-auto"
            >
              <Image
                src={showPassword ? "/eye.png" : "/secret.png"}
                alt={showPassword ? "show" : "hide"}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        <button
          onClick={handleLogin}
          disabled={isDisabled || isSubmitting}
          className={`flex justify-center rounded-[40px] py-4 px-[124px] font-semibold text-xl text-white ${
            isDisabled || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 cursor-pointer"
          }`}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white py-[68px] px-[162px] rounded-lg shadow-lg  relative flex flex-col items-center">
              <div className="text-center text-lg  font-semibold">
                {errorMessage}
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="mt-10 px-[68px] py-2 bg-[#3692ff] text-white rounded-lg"
              >
                확인
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-between py-4 px-6 rounded-lg bg-[#e6f2ff]">
          <div className="w-[100%] flex justify-between items-center">
            <div className="font-medium text-base">간편 로그인 하기</div>
            <div className="flex gap-4">
              <Link href="https://www.google.com/">
                <Image src="/goggle.png" alt="구글" width={44} height={44} />
              </Link>
              <Link href="https://www.kakao.com/page/">
                <Image src="/kakao.png" alt="카카오" width={44} height={44} />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-lg">
          판다마켓이 처음이신가요? &nbsp;
          <Link href="/signup" className="text-blue-500 underline">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
