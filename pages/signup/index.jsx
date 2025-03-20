"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이메일 입력 변경 핸들러
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailRegex = /\S+@\S+\.\S+/;
    setIsValidEmail(emailRegex.test(e.target.value));
  };

  // 닉네임 입력 변경 핸들러
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsValidPassword(newPassword.length >= 8);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmValue = e.target.value;
    setConfirmPassword(confirmValue);
    setIsPasswordMatch(confirmValue === password);
  };

  const handleSignup = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signUp`,
        {
          email,
          nickname,
          password,
          passwordConfirmation: confirmPassword,
        }
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      router.push("/");
    } catch (err) {
      console.error(
        "회원가입 실패:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data?.message || "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enter 키 입력 시 회원가입 실행
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isDisabled && !isSubmitting) {
      handleSignup();
    }
  };

  const isDisabled =
    !email ||
    !nickname ||
    !password ||
    !confirmPassword ||
    !isValidPassword ||
    !isValidEmail ||
    !isPasswordMatch;

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
          {!isValidEmail && (
            <span className="text-red-500 text-sm mt-1">
              올바른 이메일 형식을 입력해주세요.
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">닉네임</label>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            className="w-full p-4 px-6 border-none box-border rounded-lg bg-gray-100 text-lg leading-6 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="닉네임을 입력해주세요"
          />
        </div>

        <div className="relative flex flex-col">
          <label className="text-lg font-bold mb-2">비밀번호</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyPress}
            className={`w-full p-4 px-6 border-2 box-border rounded-lg bg-gray-100 text-lg leading-6 focus:outline-none ${
              isValidPassword
                ? "border-transparent focus:ring-2 focus:ring-blue-500"
                : "border-red-500"
            }`}
            placeholder="비밀번호를 입력해주세요"
          />
          {!isValidPassword && (
            <span className="text-red-500 text-sm mt-1">
              비밀번호는 8자 이상 입력해야 합니다.
            </span>
          )}
        </div>

        <div className="relative flex flex-col">
          <label className="text-lg font-bold mb-2">비밀번호 확인</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={`w-full p-4 px-6 border-2 box-border rounded-lg bg-gray-100 text-lg leading-6 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              isPasswordMatch ? "" : "border-red-500"
            }`}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
          />
          {!isPasswordMatch && (
            <span className="text-red-500 text-sm mt-1">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
        </div>

        <button
          onClick={handleSignup}
          disabled={isDisabled || isSubmitting}
          className={`flex justify-center rounded-[40px] py-4 px-[124px] font-semibold text-xl text-white ${
            isDisabled || isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 cursor-pointer"
          }`}
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>
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
          이미 회원이신가요? &nbsp;
          <Link href="/login" className="text-blue-500 underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
