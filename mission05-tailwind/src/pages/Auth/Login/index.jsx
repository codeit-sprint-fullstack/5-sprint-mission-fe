import { useRef, useState } from "react";
import Input from "../../../common/components/Input";
import AuthButton from "../../../common/components/AuthButton";
import AuthSNS from "../../Auth/Components/AuthSNS";
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

const emailIsValid = (inputValue) =>
  !isEmpty(inputValue) && isEmail(inputValue);
const passwordValid = (inputValue) => hasMinLength(inputValue, 8);

const validationRules = {
  email: emailIsValid,
  password: passwordValid,
};

export default function Login() {
  const formRef = useRef(null);
  const nav = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const formData = new FormData(formRef.current);
    const isValid = Object.entries(validationRules).every(
      ([field, validationFn]) => validationFn(formData.get(field)) // 수정된 부분
    ); // formData 순회하며 검증
    setIsFormValid(isValid); // 결과 변경
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      console.log("submit되지 못함!");
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    // 폼 제출 로직
    e.target.reset();
  };

  return (
    <main className="max-w-[640px] w-full mx-auto px-[24px] md:px-[16px]">
      <img
        src={logo}
        alt="판다마켓"
        className="my-[60px] tb:my-[48px] md:my-[24px] w-[396px] h-auto mx-auto"
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-[24px]"
      >
        <Input
          label="이메일"
          id="email"
          type="email"
          name="email"
          onInputChange={validateForm}
          isValid={emailIsValid}
          errorMessage={emailErrorMessage}
        />
        <Input
          label="비밀번호"
          id="password"
          type="password"
          name="password"
          onInputChange={validateForm}
          isValid={passwordValid}
          errorMessage={passwordErrorMessage}
          isPassword
        />
        <AuthButton type="submit" isFormValid={isFormValid}>
          로그인
        </AuthButton>
      </form>

      <AuthSNS />

      <p className="flex gap-[4px] justify-center mb-[350px] text-[0.9375rem] text-[#1F2937] font-medium leading-[18px] ">
        <p>판다마켓이 처음이신가요?</p>
        <span
          className="text-[#3182F6] underline hover:cursor-pointer hover:no-underline"
          onClick={() => nav("/signup")}
        >
          회원가입
        </span>
      </p>
    </main>
  );
}
