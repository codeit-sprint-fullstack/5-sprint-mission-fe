"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { TRANSLATE } from "@/constants";
import useValidation from "@/hooks/useValidation";
import type { SubmitContext } from "@/contexts/submit-context-factory";

interface InputProps {
  type: "text" | "email";
  name: "title" | "email";
  useSubmitState: () => Pick<SubmitContext, "setSubmitState">;
  initValue?: string; // edit일 경우 기존 값
}

export default function Input({
  type,
  name,
  useSubmitState,
  initValue,
}: InputProps) {
  const [value, setValue] = useState(initValue || ""); // 입력값 상태
  const { error, handleChange, handleBlur } = useValidation(name);
  const { setSubmitState } = useSubmitState();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    handleChange(newValue); // 실시간 유효성 검사
  };

  useEffect(() => {
    setSubmitState((prevState) => ({
      ...prevState,
      [name]: error === null,
    }));
  }, [error, setSubmitState, name]);

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="text-gray-800 font-bold text-lg mb-3">
        {TRANSLATE[name].label}
      </label>

      <input
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={TRANSLATE[name].placeholder}
        aria-required="true"
        onChange={handleInputChange} // onChange에서 실시간 오류 처리
        onBlur={() => handleBlur(value)} // onBlur에서 추가 검증
        className={`bg-gray-100 px-6 py-4 rounded-xl outline ${
          error
            ? "outline-error-red"
            : "outline-gray-100 focus:outline-primary-100"
        } focus:outline-2`}
      />

      {error && (
        <p className="text-error-red text-sm font-semibold ml-4 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
