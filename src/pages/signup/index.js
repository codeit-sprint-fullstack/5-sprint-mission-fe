import Modal from "@components/Modal";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/router";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });
  const [errors, setErrors] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
  const [isVisiblePasswordConfirm, setIsVisiblePasswordConfirm] =
    useState(true);
  const [activeModal, setActiveModal] = useState("0");
  const [modalMessage, setModalMessage] = useState("");

  const validateField = (e) => {
    const { name, value } = e.target;
    let error = "";
 
    if (name === "email") {
      if (!value.trim()) error = "이메일을 입력해주세요";
      else if (
        !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
          value.trim()
        )
      )
        error = "잘못된 이메일입니다";
    } else if (
      name === "nickname" &&
      (value.trim().length < 2 || !value.trim())
    ) {
      error = "닉네임은 2자 이상 입력해주세요";
    } else if (name === "password" && value.trim().length < 8) {
      error = "비밀번호를 8자 이상 입력해주세요";
    } else if (
      name === "passwordConfirm" &&
      value.trim() !== formData.password
    ) {
      error = "비밀번호가 일치하지 않습니다";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordToggle = () => {
    setIsVisiblePassword((prev) => !prev);
  };
  const handlePasswordConfirmToggle = () => {
    setIsVisiblePasswordConfirm((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("/users/signup", formData)
      .then((res) => {
        setModalMessage("가입 완료되었습니다.");
        setActiveModal("1");
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setModalMessage("사용 중인 이메일입니다.");
          setActiveModal("-1");
        }
      });
  };

  useEffect(() => {
    setIsActive(
      Object.values(formData).every((value) => value !== "") &&
        Object.values(errors).every((value) => value === "") &&
        formData.password === formData.passwordConfirm
    );
  }, [errors]);

  return (
    <div className="max-w-[640px] flex flex-col items-center mx-auto lg:mt-[100px]">
      <div className="relative w-[198px] md:w-[396px] h-[66px] md:h-[132px] mb-[40px]">
        <Image src="/home_logo.png" fill />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-6"
      >
        <div className="w-full">
          <div className="text-lg text-[#1F2937] font-bold mb-4">이메일</div>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={validateField}
            name="email"
            placeholder="이메일을 입력해주세요"
            className={clsx("w-full h-[56px] px-6 bg-[#F3F4F6] rounded-xl", {
              ["outline outline-2 outline-red-400"]: errors.email,
              ["focus:outline outline-2 outline-blue-400"]: !errors.email,
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-2">{errors.email}</p>
          )}
        </div>
        <div className="w-full">
          <div className="text-lg text-[#1F2937] font-bold mb-4">닉네임</div>
          <input
            type="nickname"
            value={formData.nickname}
            onChange={handleChange}
            onBlur={validateField}
            name="nickname"
            placeholder="닉네임을 입력해주세요"
            className={clsx("w-full h-[56px] px-6 bg-[#F3F4F6] rounded-xl", {
              ["outline outline-2 outline-red-400"]: errors.nickname,
              ["focus:outline outline-2 outline-blue-400"]: !errors.nickname,
            })}
          />
          {errors.nickname && (
            <p className="text-red-500 text-sm mt-2">{errors.nickname}</p>
          )}
        </div>
        <div className="w-full">
          <div className="text-lg text-[#1F2937] font-bold mb-4">비밀번호</div>
          <div className="relative">
            <input
              type={isVisiblePassword ? "password" : "text"}
              value={formData.password}
              onChange={handleChange}
              onBlur={validateField}
              name="password"
              placeholder="비밀번호를 입력해주세요"
              className={clsx("w-full h-[56px] px-6 bg-[#F3F4F6] rounded-xl", {
                ["outline outline-2 outline-red-400"]: errors.password,
                ["focus:outline outline-2 outline-blue-400"]: !errors.password,
              })}
            ></input>
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="absolute w-[24px] h-[24px] right-4 top-1/2 transform -translate-y-1/2"
            >
              <Image
                src={
                  isVisiblePassword
                    ? "/btn_visibility_on.png"
                    : "/btn_visibility_off.png"
                }
                fill
              ></Image>
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-2">{errors.password}</p>
          )}
        </div>
        <div className="w-full">
          <div className="text-lg text-[#1F2937] font-bold mb-4">
            비밀번호 확인
          </div>
          <div className="relative">
            <input
              type={isVisiblePasswordConfirm ? "password" : "text"}
              value={formData.passwordConfirm}
              onChange={handleChange}
              onBlur={validateField}
              name="passwordConfirm"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              className={clsx("w-full h-[56px] px-6 bg-[#F3F4F6] rounded-xl", {
                ["outline outline-2 outline-red-400"]: errors.passwordConfirm,
                ["focus:outline outline-2 outline-blue-400"]:
                  !errors.passwordConfirm,
              })}
            ></input>
            <button
              type="button"
              onClick={handlePasswordConfirmToggle}
              className="absolute w-[24px] h-[24px] right-4 top-1/2 transform -translate-y-1/2"
            >
              <Image
                src={
                  isVisiblePasswordConfirm
                    ? "/btn_visibility_on.png"
                    : "/btn_visibility_off.png"
                }
                fill
              ></Image>
            </button>
          </div>
          {errors.passwordConfirm && (
            <p className="text-red-500 text-sm mt-2">
              {errors.passwordConfirm}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={clsx(
            "w-full h-[56px] rounded-[40px] text-xl text-[#F3F4F6] font-semibold",
            { ["bg-[#3692FF]"]: isActive, ["bg-[#9CA3AF]"]: !isActive }
          )}
          disabled={!isActive}
        >
          회원가입
        </button>
      </form>

      <div className="w-full h-[74px] bg-[#E6F2FF] flex items-center justify-between px-7 rounded-lg mt-6">
        <div className="text-base text-[#1F2937] font-medium rounded-lg">
          간편 로그인하기
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.google.com"
            className="relative w-[42px] h-[42px]"
            target="_blank"
          >
            <Image src="/ic_google.png" fill></Image>
          </a>
          <a
            href="https://www.kakao.com"
            className="relative w-[42px] h-[42px]"
            target="_blank"
          >
            <Image src="/ic_kakao.png" fill></Image>
          </a>
        </div>
      </div>
      <div className="mt-7 text-sm text-[#1F2937] font-medium">
        이미 회원이신가요? &nbsp;
        <Link href="/login" className="underline text-[#3692FF]">
          로그인
        </Link>
      </div>
      <Modal
        isOpen={activeModal !== "0"}
        onClose={() => {
          setActiveModal(false);
          if (activeModal === "1") router.push("/login");
        }}
      >
        {modalMessage}
      </Modal>
    </div>
  );
};

export default Signup;
