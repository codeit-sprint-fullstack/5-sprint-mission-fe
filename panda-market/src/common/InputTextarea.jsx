function InputTextarea({
  InputOrTextarea = "input",
  placeholder,
  classNames,
  id = undefined,
  ...props
}) {
  return (
    <InputOrTextarea
      placeholder={placeholder}
      className={`${id} rounded-[12px] px-[24px] py-[16px] bg-secondary-100 text-secondary-400 focus:outline-[1px] focus:outline-primary-100 ${classNames}`}
      {...props}
    />
  );
}

export default InputTextarea;
