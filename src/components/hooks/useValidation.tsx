import { useState } from "react";

type ValidateFn = (value: string) => string | null;

const useValidation = (validateFn: ValidateFn) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError(null); // 값 변경 시 기존 에러 초기화
    // 에러 메시지가 특정 조건을 만족할 때만 초기화
    // if (error && validateFn(e.target.value) === null) {
    //   setError(null);
    // }
  };

  const onBlur = () => {
    const validationError = validateFn(value);
    setError(validationError);
  };

  const reset = () => {
    setValue("");
    setError(null);
  };

  return {
    value,
    error,
    onChange,
    onBlur,
    reset,
  };
};

export default useValidation;
