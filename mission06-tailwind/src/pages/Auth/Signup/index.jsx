import { useRef, useState } from "react";
import Input from "../../../common/components/Input/index.jsx";
import AuthButton from "../../../common/components/AuthButton/index.jsx";
import AuthSNS from "../Components/AuthSNS/index.jsx";
import Modal from "../../../common/components/Modal/index.jsx";
import {
  isEmpty,
  isEqual,
  isEmail,
  hasMinLength,
  hasMaxLength,
} from "../../../common/constants/inputValidation.js";
import {
  emailErrorMessage,
  nickErrorMessage,
  passwordErrorMessage,
  passwordConfirmErrorMessage,
} from "../../../common/constants/inputErrorMessage.js";
import logo from "../../../assets/logo/logo.png";

export default function Signup() {
  const modalRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    email: "",
    nick: "",
    password: "",
    passwordConfirm: "",
  });
  const [isFormValid, setIsFormValid] = useState({
    email: false,
    nick: false,
    password: false,
    passwordConfirm: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formValid = Object.values(isFormValid).every(
      (value) => value === true
    );
    if (!formValid) return;

    // 폼 제출 로직
    setErrorMessage("비밀번호가 일치하지 않습니다");
    modalRef.current.open();

    console.log(data);
    e.target.reset();
  };

  return (
    <>
      <Modal ref={modalRef} message={errorMessage} />

      <main className="max-w-[640px] w-full mx-auto px-[24px] md:px-[16px] mb-[350px]">
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
            data={data}
            onChange={setData}
            isValid={(value) => !isEmpty(value) && isEmail(value)}
            errorMessage={emailErrorMessage}
            setIsFormValid={setIsFormValid}
          />
          <Input
            label="닉네임"
            id="nick"
            type="text"
            name="nick"
            placeholder="닉네임을 입력해주세요"
            data={data}
            onChange={setData}
            isValid={(value) => hasMaxLength(value, 5)}
            errorMessage={nickErrorMessage}
            setIsFormValid={setIsFormValid}
          />
          <Input
            label="비밀번호"
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            data={data}
            onChange={setData}
            isValid={(value) => hasMinLength(value, 8)}
            errorMessage={passwordErrorMessage}
            setIsFormValid={setIsFormValid}
            isPassword
          />
          <Input
            label="비밀번호 확인"
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            data={data}
            onChange={setData}
            isValid={(value) => isEqual(value, data.password)}
            setIsFormValid={setIsFormValid}
            errorMessage={passwordConfirmErrorMessage}
            isPassword
          />
          <AuthButton
            type="submit"
            isActive={Object.values(isFormValid).every(
              (value) => value === true
            )}
          >
            회원가입
          </AuthButton>
        </form>

        <AuthSNS />
      </main>
    </>
  );
}
