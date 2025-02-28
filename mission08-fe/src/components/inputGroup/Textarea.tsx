"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { TRANSLATE } from "@/constants";
import useValidation from "@/hooks/useValidation";
import type { SubmitContext } from "@/contexts/submit-context-factory";

interface State {
  status: boolean;
  message: string;
}
interface TextareaProps {
  name: "content" | "comment";
  useSubmitState: () => Pick<SubmitContext, "setSubmitState">;
  state?: State | null;
  initValue?: string; // edit일 경우 기존 값
}

const HEIGHT = {
  content: 282,
  comment: 104,
};

export default function Textarea({
  name,
  useSubmitState,
  state = null,
  initValue,
}: TextareaProps) {
  const [value, setValue] = useState(initValue || ""); // 입력값 상태
  const { error, handleChange, handleBlur } = useValidation(name);
  const { setSubmitState } = useSubmitState();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(() => newValue);
    handleChange(newValue); // 실시간 유효성 검사
  };

  useEffect(() => {
    setSubmitState((prevState) => ({
      ...prevState,
      [name]: error === null,
    }));
  }, [error, setSubmitState, name]);

  useEffect(() => {
    if (!state) return;

    if (state.status) {
      setValue("");
      state.status = false;
      state.message = "";
    }
  }, [state]);

  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="text-gray-800 font-bold text-lg mb-3">
        {TRANSLATE[name].label}
      </label>

      <textarea
        name={name}
        id={name}
        value={value}
        placeholder={TRANSLATE[name].placeholder}
        onChange={handleTextareaChange}
        onBlur={() => handleBlur(value)}
        style={{ height: `${HEIGHT[name]}px` }}
        className={`bg-gray-100 px-6 py-4 rounded-xl outline ${
          error
            ? "outline outline-error-red"
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
