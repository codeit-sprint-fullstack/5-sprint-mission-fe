import { useState, useRef } from "react";
import Input from "../../../common/components/Input";
import AuthButton from "../../../common/components/AuthButton";
import AuthSNS from "../../Auth/Components/AuthSNS";
import Modal from "../../../common/components/Modal/index.jsx";
import {
  isEmpty,
  isEmail,
  hasMinLength,
} from "../../../common/constants/inputValidation.js";
import {
  emailErrorMessage,
  passwordErrorMessage,
} from "../../../common/constants/inputErrorMessage.js";
import logo from "../../../assets/logo/logo.png";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const modalRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState({
    email: false,
    password: false,
  });
  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    // 폼 제출 로직
    setErrorMessage("비밀번호가 일치하지 않습니다");
    modalRef.current.open();

    e.target.reset();
  };

  return (
    <>
      <Modal ref={modalRef} message={errorMessage} />

      <main className="max-w-[640px] w-full mx-auto mb-[350px] px-[24px] md:px-[16px]">
        <img
          src={logo}
          alt="판다마켓"
          className="my-[60px] tb:my-[48px] md:my-[24px] w-[396px] h-auto mx-auto"
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-[24px]">
          <Input
            label="이메일"
            id="email"
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            initValue=""
            data={data}
            onChange={setData}
            isValid={(value) => !isEmpty(value) && isEmail(value)}
            errorMessage={emailErrorMessage}
            setIsFormValid={setIsFormValid}
          />
          <Input
            label="비밀번호"
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            initValue=""
            data={data}
            onChange={setData}
            isValid={(value) => hasMinLength(value, 8)}
            errorMessage={passwordErrorMessage}
            setIsFormValid={setIsFormValid}
            isPassword
          />
          <AuthButton
            type="submit"
            isActive={Object.values(isFormValid).every(
              (value) => value === true
            )}
          >
            로그인
          </AuthButton>
        </form>

        <AuthSNS />

        <div className="flex gap-[4px] justify-center text-[0.9375rem] text-[#1F2937] font-medium leading-[18px] ">
          <p>판다마켓이 처음이신가요?</p>
          <span
            className="text-[#3182F6] underline hover:cursor-pointer hover:no-underline"
            onClick={() => nav("/signup")}
          >
            회원가입
          </span>
        </div>
      </main>
    </>
  );
}
