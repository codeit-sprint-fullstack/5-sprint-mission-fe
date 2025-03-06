import { useState, useEffect } from "react";

interface EmailError {
  isError: boolean;
  message: string;
}

type PasswordMatchStatus = "init" | "same" | "notSame";

export const useSignupInput = () => {
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<EmailError>({
    isError: false,
    message: "",
  });
  const [nickname, setNickname] = useState<string>("");
  const [inputPassword, setInputPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isShowPasswordText, setIsShowPasswordText] = useState(false);
  const [isShowConfirmPasswordText, setIsShowConfirmPasswordText] =
    useState(false);
  const [isPasswordSame, setIsPasswordSame] =
    useState<PasswordMatchStatus>("init");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 이메일 유효성 검사
  const isEmailValid = (email: string): boolean => {
    return email.length > 0 && validateEmail(email);
  };

  // 이메일 입력 처리
  const handleEmailChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value.length > 0) {
      const isValid = validateEmail(value);
      setEmailError({
        isError: !isValid,
        message: !isValid ? "잘못된 이메일 형식입니다." : "",
      });
    } else {
      setEmailError({ isError: false, message: "" });
    }
  };

  // 닉네임 입력 처리
  const handleNicknameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNickname(value);
  };

  // 비밀번호 유효성 검사 상태
  const [passwordValidation, setPasswordValidation] = useState({
    isLengthValid: false, // 8-20자
    isComplexValid: false, // 영문, 숫자, 특수문자 조합
    hasNoSequential: false, // 연속된 숫자 없음
  });

  // 비밀번호 입력 처리
  const handleInputPw = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputPassword({
      ...inputPassword,
      [name]: value,
    });
  };

  //TODO: 에러 메시지 추가
  // 비밀번호 유효성 검사
  useEffect(() => {
    const password = inputPassword.password;

    // 8자 이상 검사
    const isLengthValid = password.length >= 8;

    // 영문, 숫자, 특수문자 중 2가지 이상 조합 검사
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // 각 조건의 충족 여부를 배열로 만들어 true인 개수를 세기
    const conditionsMet = [hasLetter, hasNumber, hasSpecial].filter(
      Boolean
    ).length;
    const isComplexValid = conditionsMet >= 2;

    // 연속된 숫자 검사 (4자리 이상)
    const hasNoSequential =
      !/(?:0123|1234|2345|3456|4567|5678|6789|7890|0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)/.test(
        password
      );

    setPasswordValidation({
      isLengthValid,
      isComplexValid,
      hasNoSequential,
    });
  }, [inputPassword.password]);

  // 비밀번호 일치 여부 검사
  useEffect(() => {
    if (inputPassword.confirmPassword === "") {
      setIsPasswordSame("init");
    } else if (inputPassword.password === inputPassword.confirmPassword) {
      setIsPasswordSame("same");
    } else {
      setIsPasswordSame("notSame");
    }
  }, [inputPassword.password, inputPassword.confirmPassword]);

  const handleIsShowPassword = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setIsShowPasswordText(!isShowPasswordText);
    } else {
      setIsShowConfirmPasswordText(!isShowConfirmPasswordText);
    }
  };

  // 모든 비밀번호 조건이 충족되었는지 확인
  const isPasswordValid =
    passwordValidation.isLengthValid &&
    passwordValidation.isComplexValid &&
    passwordValidation.hasNoSequential &&
    isPasswordSame === "same";

  return {
    email,
    emailError,
    isEmailValid,
    handleEmailChange,
    nickname,
    handleNicknameChange,
    inputPassword,
    isShowPasswordText,
    isShowConfirmPasswordText,
    isPasswordSame,
    passwordValidation,
    isPasswordValid,
    handleInputPw,
    handleIsShowPassword,
  };
};
