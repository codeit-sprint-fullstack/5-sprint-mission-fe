import { useEffect, useState, memo } from "react";
import pwHidden from "../../../assets/password/btn_visibility_off.png";
import pwShow from "../../../assets/password/btn_visibility_on.png";

const Input = memo(function Input({
  label,
  onInputChange,
  isValid,
  errorMessage,
  isPassword,
  ...props
}) {
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [didEdit, setDidEdit] = useState(false);

  const handleBlur = () => setDidEdit(true); // focus 해제시 오류메시지 보여줌

  const handleChange = (e) => {
    setInputValue(() => e.target.value);
    onInputChange();
    setDidEdit(false);
  }; // input 변경될 때마다 실행

  useEffect(() => setIsError(!isValid(inputValue)), [inputValue, isValid]);

  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-[16px]">
        <label
          htmlFor={props.id}
          className="text-[#1F2937] text-[1.125rem] font-bold leading-[22px]"
        >
          {label}
        </label>

        <div
          className={`flex items-center border ${
            didEdit && inputValue !== "" && isError
              ? "border-[#F74747]"
              : "border-none"
          } bg-[#F3F4F6] text-[#1F2937] text-[1rem] leading-[24px] font-normal py-[16px] px-[24px] rounded-[12px]`}
        >
          <input
            {...props}
            value={inputValue}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-full appearance-none border-none p-0 outline-none focus:outline-none focus:ring-0 bg-transparent"
          />
          {isPassword && (
            <img
              src={pwHidden}
              alt="비밀번호 미리보기"
              className="w-[24px] h-[24px] hover:cursor-pointer"
            />
          )}
        </div>
      </div>

      {didEdit && inputValue !== "" && isError && (
        <div className="text-[#F74747] text-[0.9375rem] font-semibold leading-[18px] mt-[8px] ml-[16px]">
          <p>{errorMessage}</p>
        </div>
      )}
    </section>
  );
});

export default Input;
