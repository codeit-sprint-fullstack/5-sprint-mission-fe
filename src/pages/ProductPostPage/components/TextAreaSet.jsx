export default function TextAreaSet({ label, id, value, onChange, placeholder }) {
  return (
    <>
      <label
        htmlFor={id}
        className="mt-6 text-[18px] font-bold text-[#1F2937]"
      >
        상품 소개
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        className="mt-4 h-[280px] rounded-xl bg-[#F3F4F6] px-6 pt-4"
        value={value}
        onChange={onChange}
      />
    </>
  );
}
