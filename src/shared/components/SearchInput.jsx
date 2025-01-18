export default function SearchInput({ placeholder, value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      type="text"
      placeholder={placeholder}
      className="order-3 rounded-xl bg-[#F3F4F6] px-[44px] py-[9px]"
    />
  )
}