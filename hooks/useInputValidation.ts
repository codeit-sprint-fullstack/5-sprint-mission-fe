import { useState, ChangeEvent } from "react";

type ValidationFunction<T> = (value: T) => string;

export function useInputValidation<T extends string>(
  initialValue: T,
  validateFunction?: ValidationFunction<T>
) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState("");

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value as T;
    setValue(newValue);

    if (validateFunction) {
      const errorMsg = validateFunction(newValue);
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

// validation.ts
export const validateName = (value: string): string => {
  if (!value.trim()) return "상품명을 입력해주세요";
  if (value.length > 10) return "10자 이내로 입력해주세요";
  return "";
};

export const validateDescription = (value: string): string => {
  if (!value.trim()) return "상품 소개를 입력해주세요";
  if (value.length < 10) return "10자 이상 입력해주세요";
  if (value.length > 100) return "100자 이내 입력해주세요";
  return "";
};

export const validatePrice = (value: string): string => {
  if (!value) return "가격을 입력해주세요";
  // isNaN: 값이 NaN인지 판별해서 boolean으로 반환
  if (isNaN(Number(value))) return "숫자로 입력해주세요";
  return "";
};

export const validateTags = (value: string): string => {
  if (!value.trim()) return "태그를 입력해주세요";
  if (value.length > 5) return "5자 이내로 입력해주세요";
  return "";
};
