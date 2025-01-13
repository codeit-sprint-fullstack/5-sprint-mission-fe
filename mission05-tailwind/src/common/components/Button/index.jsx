export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-[#3692FF] text-gray-100 text-base font-semibold leading-[26px] rounded-lg px-6 py-2 hover:cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
