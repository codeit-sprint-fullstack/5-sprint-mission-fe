export default function AuthButton({ children, isActive, ...props }) {
  return (
    <button
      className={`w-full ${
        isActive
          ? "bg-[#3692FF] hover:cursor-pointer"
          : "bg-[#9CA3AF] hover:cursor-default"
      } text-[#FFFFFF] text-[20px] md:text-[16px] font-semibold leading-[24px] rounded-[40px] py-[16px] transition-colors duration-300 ease-in-out`}
      {...props}
    >
      {children}
    </button>
  );
}
