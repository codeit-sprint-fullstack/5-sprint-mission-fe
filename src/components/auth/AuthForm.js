import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import LogoImg from "@images/logo-image/mainLogo.png";
import LogoText from "@images/logo-image/mainText.png";
import VisibilityOn from "@images/input-icon/visibility_on.png";
import VisibilityOff from "@images/input-icon/visibility_off.png";
import EasyLogin from "@/components/auth/login/EasyLogin";
import EasySignUP from "@/components/auth/signUp/EasySignUp";
import { useForm } from "react-hook-form";
import { useAuth } from "@/core/contexts/AuthContext";

export default function AuthForm({ type }) {
  const { login, signup, setRedirectUrl } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      passwordConfirmation: "",
    },
  });
  const router = useRouter();

  const errorMessage = (type) =>
    type === "login"
      ? "비밀번호가 일치하지 않습니다."
      : "사용 중인 이메일입니다.";

  const mutation = useMutation({
    mutationFn: type === "login" ? login : signup,
    onSuccess: (data) => {
      setRedirectUrl(router.query.redirectUrl || "/");
      router.push("/");
    },
    onError: (error) => {
      setShowModal(true);
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    const requestData =
      type === "login"
        ? { email: data.email, password: data.password }
        : {
            email: data.email,
            nickname: data.nickname,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
          };

    mutation.mutate(requestData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <header className="flex gap-3 md:gap-5 ">
        <Link href={"/"}>
          <Image
            src={LogoImg}
            alt="이미지 로고"
            className="w-[52px] md:w-[104px] object-contain"
          />
        </Link>
        <Link href={"/"} className="flex items-center">
          <Image
            src={LogoText}
            alt="텍스트 로고"
            className="w-[133px] md:w-[266px] object-contain"
          />
        </Link>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white py-6 w-[343px] md:w-[640px] gap-6"
      >
        <div className="flex flex-col gap-2 md:gap-4">
          <h2 className="text-sm md:text-lg font-bold ">이메일</h2>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식을 입력해주세요",
              },
            })}
            className="bg-custom-input-gray-100 border rounded-xl py-3.5 px-6  w-full border-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {type === "signup" && (
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="text-sm md:text-lg font-bold">닉네임</h2>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              {...register("nickname", {
                required: "닉네임을 입력해주세요",
                minLength: {
                  value: 1,
                  message: "닉네임은 최소 1자 이상 입력해주세요",
                },
                maxLength: {
                  value: 10,
                  message: "닉네임은 최대 10자까지 입력 가능합니다",
                },
              })}
              className="bg-custom-input-gray-100 border rounded-xl py-3.5 px-6 w-full border-none"
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm">{errors.nickname.message}</p>
            )}
          </div>
        )}

        <div className="relative flex flex-col gap-2 md:gap-4">
          <h2 className="  text-sm md:text-lg font-bold ">비밀번호</h2>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="비밀번호를 입력해주세요"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자 이상 입력해주세요",
              },
            })}
            className="bg-custom-input-gray-100 border rounded-xl py-3.5 px-6 w-full border-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={
              errors.password
                ? "absolute w-6 bottom-12.5 right-5"
                : "absolute w-6 bottom-3.5 right-5"
            }
          >
            <Image
              src={showPassword ? VisibilityOn : VisibilityOff}
              alt="페스워드 확인 아이콘"
            />
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {type === "signup" && (
          <div className="relative flex flex-col gap-2 md:gap-4">
            <h2 className="text-sm md:text-lg font-bold">비밀번호 확인</h2>
            <input
              type={showPasswordConfirmation ? "text" : "password"}
              placeholder="비밀번호를 재입력해주세요"
              {...register("passwordConfirmation", {
                required: "비밀번호를 다시 입력해주세요",
                validate: (value) =>
                  value === watch("password") || "비밀번호가 일치하지 않습니다",
              })}
              className="bg-custom-input-gray-100 border rounded-xl py-3.5 px-6 w-full border-none"
            />
            <button
              type="button"
              onClick={() =>
                setShowPasswordConfirmation(!showPasswordConfirmation)
              }
              className={
                errors.passwordConfirmation
                  ? "absolute w-6 bottom-12.5 right-5"
                  : "absolute w-6 bottom-3.5 right-5"
              }
            >
              <Image
                src={showPasswordConfirmation ? VisibilityOn : VisibilityOff}
                alt="페스워드 확인 아이콘"
              />
            </button>
            {errors.passwordConfirmation && (
              <p className="text-red-500 text-sm">
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className={` text-xl font-semibold text-white py-3 rounded-[40px] w-full ${
            mutation.isPending
              ? "cursor-not-allowed bg-custom-text-gray-50"
              : "bg-custom-color-blue"
          }`}
        >
          {type === "login" ? "로그인" : "회원가입"}
        </button>
      </form>

      {type === "login" ? <EasyLogin /> : <EasySignUP />}
      {showModal && (
        <div
          className="fixed z-50 inset-0 flex items-center justify-center 
         bg-black "
        >
          <section
            className="flex flex-col items-center w-[327px] md:w-[540px] gap-10 bg-white 
            py-16 rounded-lg "
          >
            <p className="text-lg font-medium">{errorMessage(type)}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-custom-color-blue text-white w-[] px-12 py-3 rounded-xl md:px-16"
            >
              확인
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
