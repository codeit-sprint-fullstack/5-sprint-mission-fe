function Input({
  type = "text",
  label,
  id,
  placeholder,
  value,
  onChange,
  ...field
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      <label htmlFor={id} className="text-[14px] font-[700] text-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="w-full h-[42px] bg-gray-100 rounded-[12px] px-[24px] placeholder:gray-400"
        value={value}
        onChange={onChange}
        {...field}
      />
    </div>
  );
}

export default Input;
