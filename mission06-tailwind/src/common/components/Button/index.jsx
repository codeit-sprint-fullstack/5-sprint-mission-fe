export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-[#3692FF] text-[#FFFFFF] text-[1rem] font-semibold leading-[26px] rounded-[8px] py-[8px] px-[23px] hover:cursor-pointer"
      {...props}
    >
      {children}
    </button>
  );
}
