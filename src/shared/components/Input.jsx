export default function Input({ value, onChange, id, type, placeholder, className }) {
  return (
    <input value={value} onChange={onChange} type={type} id={id} placeholder={placeholder} className={`pl-6 py-3 bg-[#F3F4F6] rounded-xl ${className}`}/>
  )
}