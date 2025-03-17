export type ValidationResult = {
  isValid: boolean;
  errorMessage: string;
};

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
  if (!email) return { isValid: false, errorMessage: "이메일을 입력해주세요." };
  if (!emailRegex.test(email))
    return { isValid: false, errorMessage: "잘못된 이메일 형식입니다." };
  return { isValid: true, errorMessage: "" };
};

export const validatePassword = (password: string): ValidationResult => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!password)
    return { isValid: false, errorMessage: "비밀번호를 입력해주세요." };
  if (!passwordRegex.test(password))
    return {
      isValid: false,
      errorMessage: "비밀번호를 8자 이상 입력해주세요.",
    };
  return { isValid: true, errorMessage: "" };
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword)
    return { isValid: false, errorMessage: "비밀번호를 입력해주세요." };
  if (password !== confirmPassword)
    return { isValid: false, errorMessage: "비밀번호가 일치하지 않습니다." };
  return { isValid: true, errorMessage: "" };
};

export const checkFormValidity = (validationResults: {
  [key: string]: boolean;
}) => {
  // 객체의 모든 값이 true인지 확인
  const allValid = Object.values(validationResults).every((isValid) => isValid);
  return allValid;
};
