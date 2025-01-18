
export default function InputSet({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
}) {
  return (
    <>
      <label htmlFor={id} className="text-[#1F2937] text-[18px] font-bold mt-6">{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        placeholder={placeholder}
        className="pl-6 py-4 bg-[#F3F4F6] rounded-xl mt-4"
      />
    </>
  );
}
