import { useState } from "react";
import { INPUT_VALID, Name } from "@/constants";

const useValidation = (name: Name) => {
  const [error, setError] = useState<string | null>("");

  const validateInput = (inputValue: string) => {
    const cleanedValue = inputValue.replace(/\s+/g, ""); // 공백 제거, 한줄 표현
    const pattern = INPUT_VALID[name].pattern;
    const isEmpty = cleanedValue === "";

    if (isEmpty) {
      return "값을 입력해 주세요."; // 빈 값 오류 메시지
    } else if (!pattern.test(cleanedValue)) {
      return INPUT_VALID[name].message; // 패턴 불일치 오류 메시지
    }
    return null; // 유효한 경우 오류 없음
  };

  const handleChange = (inputValue: string) => {
    setError(validateInput(inputValue)); // 입력할 때마다 즉시 검증
  };

  const handleBlur = (inputValue: string) => {
    setError(validateInput(inputValue)); // 포커스 해제 시 최종 검증
  };

  return { error, handleChange, handleBlur };
};

export default useValidation;
