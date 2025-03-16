"use client";

import passwordVisibleSVG from "@/assets/icons/password-visible.svg";
import passwordInvisibleSVG from "@/assets/icons/password-invisible.svg";
import googleIcon from "@/assets/icons/ic_google.svg";
import kakaoIcon from "@/assets/icons/ic_kakao.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { ApiError } from "@/lib/apiClient";
import { useAuthStore } from "@/stores/authStore";
import Logo from "../_components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("example@email.com");
  const [password, setPassword] = useState("password");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const login = useAuthStore((state) => state.login);

  const router = useRouter();

  const isLoginAvailable = isEmailValid && isPasswordValid && email && password;

  const handleEmailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (!email) {
      setEmail("");
      setIsEmailValid(true);
      return;
    }
    setEmail(email);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);

    if (isValid) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePasswordValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    if (!password) {
      setPassword("");
      setIsPasswordValid(true);
      return;
    }
    setPassword(password);

    const isValid = password.length >= 8;

    if (isValid) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleLogin = async () => {
    if (!isLoginAvailable) {
      return;
    }

    console.log("로그인 버튼 클릭");

    try {
      const isLoggedIn = await login(email, password);

      if (isLoggedIn) {
        router.push("/board");
      } else {
        setErrorMessage("유저 정보가 없습니다.");
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
        console.error("로그인 오류:", error.message);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
        console.error("로그인 오류:", error);
      }
    }
  };

  const handleKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  console.log("isLoggedIn", isLoggedIn);

  if (isLoggedIn) {
    router.push("/board");
  }

  return (
    <>
      <div className="flex flex-col justify-center max-w-[640px] mx-auto h-screen px-4">
        {/* 로고 */}
        <Logo />
        {/* 이메일 폼 */}
        <div className="mt-10">
          <p className="text-gray-800 text-sm font-bold mb-6">이메일</p>
          <input
            type="text"
            placeholder="이메일을 입력해주세요."
            className={`w-full h-[56px] bg-gray-100 rounded-xl px-6 py-4 border focus:outline-none focus:ring-2 ${
              isEmailValid
                ? "focus:ring-blue-500 border-transparent"
                : "focus:ring-red-500 border-red-500"
            }`}
            value={email}
            onChange={handleEmailValidation}
            onKeyDown={handleKeyDownEnter}
          ></input>
          {isEmailValid ? null : (
            <p className="ml-4 mt-2 text-red-500 text-sm font-bold">
              이메일 형식이 올바르지 않습니다.
            </p>
          )}
        </div>

        {/* 비밀번호 폼 */}
        <div className="pt-6">
          <p className="text-gray-800 text-sm font-bold mb-6">비밀번호</p>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요."
              className={`w-full h-[56px] bg-gray-100 rounded-xl px-6 py-4 border focus:outline-none focus:ring-2 ${
                isPasswordValid
                  ? "focus:ring-blue-500 border-transparent"
                  : "focus:ring-red-500 border-red-500"
              }`}
              value={password}
              onChange={handlePasswordValidation}
              onKeyDown={handleKeyDownEnter}
            ></input>
            <button
              className="absolute right-6 h-full"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                src={
                  passwordVisible ? passwordVisibleSVG : passwordInvisibleSVG
                }
                alt="password-invisible"
                width={24}
                height={24}
              />
            </button>
          </div>
          {isPasswordValid ? null : (
            <p className="ml-4 mt-2 text-red-500 text-sm font-bold">
              비밀번호를 8자 이상 입력해주세요.
            </p>
          )}
        </div>

        {/* TODO: 버튼 컴포넌트로 통합 */}
        {/* 로그인 버튼 */}
        <button
          className={`mt-4 w-full h-[56px] ${
            isLoginAvailable ? "bg-primary" : "bg-gray-400"
          }  rounded-full`}
          onClick={handleLogin}
          disabled={!isLoginAvailable}
        >
          <p className="text-white text-xl font-semibold">로그인</p>
        </button>

        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-row items-center justify-between px-6 mt-6 w-full h-[74px] bg-[#E6F2FF] rounded-lg">
          <p className="text-[#1F2937] text-base font-medium">
            간편 로그인하기
          </p>
          <div className="flex flex-row gap-4">
            <Link href="https://www.google.com" target="_blank">
              <Image
                src={googleIcon}
                alt="google-icon"
                width={42}
                height={42}
              />
            </Link>
            <Link href="https://www.kakao.com" target="_blank">
              <Image src={kakaoIcon} alt="kakao-icon" width={42} height={42} />
            </Link>
          </div>
        </div>

        {/* 회원가입 버튼 */}
        <div className="flex flex-row justify-center gap-1 mt-6 text-sm">
          <p>판다마켓은 처음이신가요?</p>
          <Link href="/signup">
            <p className="text-primary underline">회원가입</p>
          </Link>
        </div>
      </div>
      {errorMessage && (
        <Modal onClick={() => setErrorMessage("")} message={errorMessage} />
      )}
    </>
  );
}
