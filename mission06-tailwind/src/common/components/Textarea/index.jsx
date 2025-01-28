import { useEffect, useState, memo } from "react";

const Textarea = memo(function Textarea({
  label,
  initValue,
  data,
  onChange,
  isValid,
  errorMessage,
  setIsFormValid,
  ...props
}) {
  const { name } = props;
  const [isError, setIsError] = useState(false);
  const [didEdit, setDidEdit] = useState(false);

  const handleBlur = () => setDidEdit(true); // focus 해제 시 오류 메시지 표시

  const handleChange = (e) => {
    onChange((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
    setDidEdit(false);
  }; // textarea 변경 시 실행

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
          className={`flex flex-col border ${
            didEdit && data[name] !== initValue && isError
              ? "border-[#F74747]"
              : "border-none"
          } bg-[#F3F4F6] text-[#1F2937] text-[1rem] leading-[24px] font-normal py-[16px] px-[24px] rounded-[12px]`}
        >
          <textarea
            {...props}
            value={data[name]}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-full h-[282px] appearance-none border-none p-0 outline-none focus:outline-none focus:ring-0 bg-transparent resize-none"
          />
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

export default Textarea;
