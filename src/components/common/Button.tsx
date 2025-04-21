import { ButtonProps } from "@/types/components.types";

const Button = ({ children, className, disabled, ...props }: ButtonProps) => {
  return (
    <button
      className={`${
        disabled
          ? "bg-gray-400 cursor-not-allowed opacity-70"
          : "bg-primary-blue hover:bg-blue-500"
      } text-white px-6 py-2.5 rounded-lg text-[16px] font-semibold ${
        className || ""
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
