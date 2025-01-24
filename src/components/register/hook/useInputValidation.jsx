import { useState } from "react";

export function useInputValidation(initialValue, validateFunction) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  // 입력 값 변경 핸들러
  const handleChange = (event) => {
    const { value } = event.target;
    setValue(value);

    // 유효성 검사 실행
    if (validateFunction) {
      const errorMsg = validateFunction(value);
      setError(errorMsg);
    }
  };

  return {
    value,
    setValue,
    error,
    setError,
    handleChange,
  };
}
