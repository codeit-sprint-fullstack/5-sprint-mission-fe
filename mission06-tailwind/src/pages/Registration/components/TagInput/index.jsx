import { useEffect, useState, memo } from "react";

const TagInput = memo(function TagInput({
  label,
  handleKeyDown,
  isValid,
  errorMessage,
  setIsFormValid,
  ...props
}) {
  const { name } = props;
  const [tag, setTag] = useState("");
  const [isError, setIsError] = useState(false);
  const [didEdit, setDidEdit] = useState(false);

  const handleBlur = () => setDidEdit(true); // focus 해제시 오류메시지 보여줌

  const handleChange = (e) => {
    setTag(e.target.value || "");
    setDidEdit(false);
  }; // input 변경될 때마다 실행

  useEffect(() => {
    setIsError(!isValid(tag));
  }, [tag, isValid]);

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
            didEdit && tag !== "" && isError
              ? "border-[#F74747]"
              : "border-none"
          } bg-[#F3F4F6] text-[#1F2937] text-[1rem] leading-[24px] font-normal py-[16px] px-[24px] rounded-[12px]`}
        >
          <input
            {...props}
            onBlur={handleBlur}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full appearance-none border-none p-0 outline-none focus:outline-none focus:ring-0 bg-transparent"
          />
        </div>
      </div>

      {didEdit && tag !== "" && isError && (
        <div className="text-[#F74747] text-[0.9375rem] font-semibold leading-[18px] mt-[8px] ml-[16px]">
          <p>{errorMessage}</p>
        </div>
      )}
    </section>
  );
});

export default TagInput;
