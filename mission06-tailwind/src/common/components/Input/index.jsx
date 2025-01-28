import { useEffect, useState, memo, useRef } from "react";
import pwHidden from "../../../assets/password/btn_visibility_off.png";
import pwShow from "../../../assets/password/btn_visibility_on.png";

const Input = memo(function Input({
  label,
  initValue,
  data,
  onChange,
  isValid,
  errorMessage,
  setIsFormValid,
  isPassword,
  ...props
}) {
  const { name } = props;
  const inputRef = useRef(null);
  const [isError, setIsError] = useState(false);
  const [didEdit, setDidEdit] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleBlur = () => setDidEdit(true); // focus 해제시 오류메시지 보여줌

  const handleChange = (e) => {
    onChange((prevDate) => ({
      ...prevDate,
      [name]: e.target.value,
    }));
    setDidEdit(false);
  }; // input 변경될 때마다 실행

  const handleClick = (e) => {
    if (isPasswordVisible) {
      inputRef.current.type = "password";
      e.target.alt = "비밀번호 미리보기";
      e.target.src = pwHidden;
      setIsPasswordVisible(false); // 비밀번호 가리기 상태로 변경
    } else {
      inputRef.current.type = "text";
      e.target.alt = "비밀번호 감추기";
      e.target.src = pwShow;
      setIsPasswordVisible(true); // 비밀번호 보기 상태로 변경
    }
  };

  useEffect(() => {
    setIsError(!isValid(data[name]));
  }, [data, name, isValid]);

  useEffect(() => {
    setIsFormValid((prevFormValid) => ({
      ...prevFormValid,
      [name]: !isError,
    }));
  }, [name, isError, setIsFormValid]);

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
            didEdit && data[name] !== initValue && isError
              ? "border-[#F74747]"
              : "border-none"
          } bg-[#F3F4F6] text-[#1F2937] text-[1rem] leading-[24px] font-normal py-[16px] px-[24px] rounded-[12px]`}
        >
          <input
            ref={inputRef}
            {...props}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-full appearance-none border-none p-0 outline-none focus:outline-none focus:ring-0 bg-transparent"
          />
          {isPassword && (
            <img
              src={pwHidden}
              alt="비밀번호 미리보기"
              onClick={handleClick}
              className="w-[24px] h-[24px] hover:cursor-pointer"
            />
          )}
        </div>
      </div>

      {didEdit && data[name] !== initValue && isError && (
        <div className="text-[#F74747] text-[0.9375rem] font-semibold leading-[18px] mt-[8px] ml-[16px]">
          <p>{errorMessage}</p>
        </div>
      )}
    </section>
  );
});

export default Input;
