"use client";

import Logo from "../_components/Logo";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import passwordVisibleSVG from "@/assets/icons/password-visible.svg";
import passwordInvisibleSVG from "@/assets/icons/password-invisible.svg";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
};

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<Inputs>({ mode: "onChange" });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordCheckVisible, setPasswordCheckVisible] = useState(false);

  const signup = useAuthStore((state) => state.signup);
  const router = useRouter();

  const requestSignup = async (inputs: Inputs) => {
    console.log(inputs);
    const signupResponse = await signup(
      inputs.email,
      inputs.nickname,
      inputs.password,
      inputs.passwordCheck
    );

    if (signupResponse) {
      alert("회원가입이 완료되었습니다.");
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-[640px] mx-auto h-screen px-4">
      <Logo />

      {/* 이메일 폼 */}
      <div className="mt-10">
        <p className="text-gray-800 text-sm font-bold mb-6">이메일</p>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "이메일 형식이 올바르지 않습니다.",
            },
          })}
          type="text"
          placeholder="이메일을 입력해주세요."
          className={`w-full h-[56px] bg-gray-100 rounded-xl px-6 py-4 border focus:outline-none focus:ring-2 ${
            errors.email
              ? "focus:ring-red-500 border-red-500"
              : "focus:ring-blue-500 border-transparent"
          }`}
          // onKeyDown={handleKeyDownEnter}
        ></input>
        {errors.email && (
          <p className="ml-4 mt-2 text-red-500 text-sm font-bold">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* 닉네임 폼 */}
      <div className="pt-6">
        <p className="text-gray-800 text-sm font-bold mb-6">닉네임</p>
        <input
          {...register("nickname", { required: true })}
          type="text"
          placeholder="닉네임을 입력해주세요."
          className="w-full h-[56px] bg-gray-100 rounded-xl px-6 py-4 border focus:outline-none focus:ring-2 focus:ring-blue-500 border-transparent"
        ></input>
      </div>

      {/* 비밀번호 폼 */}
      <div className="pt-6">
        <p className="text-gray-800 text-sm font-bold mb-6">비밀번호</p>
        <div className="relative">
          <input
            {...register("password", {
              required: true,
              minLength: {
                value: 8,
                message: "비밀번호를 8자 이상 입력해주세요.",
              },
            })}
            type={passwordVisible ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            className={`w-full h-[56px] bg-gray-100 rounded-xl px-6 py-4 border focus:outline-none focus:ring-2 ${
              errors.password
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-blue-500 border-transparent"
            }`}
            // onKeyDown={handleKeyDownEnter}
          ></input>
          <button
            className="absolute right-6 h-full"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            <Image
              src={passwordVisible ? passwordVisibleSVG : passwordInvisibleSVG}
              alt="password-invisible"
              width={24}
              height={24}
            />
          </button>
        </div>
        {errors.password && (
          <p className="ml-4 mt-2 text-red-500 text-sm font-bold">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* 비밀번호 확인 폼 */}
      <div className="pt-6">
        <p className="text-gray-800 text-sm font-bold mb-6">비밀번호 확인</p>
        <input
          {...register("passwordCheck", {
            required: true,
            validate: {
              matchesPassword: (value) => {
                const { password } = getValues();
                console.log(password, value);
                return password === value || "비밀번호가 일치하지 않습니다.";
              },
            },
          })}
          type={passwordCheckVisible ? "text" : "password"}
          placeholder="비밀번호를 확인해주세요."
          className={`w-full h-[56px] bg-gray-100 rounded-xl px-6 py-4 border focus:outline-none focus:ring-2 ${
            errors.passwordCheck
              ? "focus:ring-red-500 border-red-500"
              : "focus:ring-blue-500 border-transparent"
          }`}
        ></input>
        {errors.passwordCheck && (
          <p className="ml-4 mt-2 text-red-500 text-sm font-bold">
            {errors.passwordCheck.message}
          </p>
        )}
      </div>

      {/* 회원가입 버튼 */}
      <button
        className={`mt-4 w-full h-[56px] rounded-full ${
          isValid ? "bg-primary" : "bg-gray-400"
        }`}
        disabled={!isValid}
        onClick={handleSubmit(requestSignup)}
      >
        <p className="text-white text-xl font-semibold">회원가입</p>
      </button>
    </div>
  );
}
