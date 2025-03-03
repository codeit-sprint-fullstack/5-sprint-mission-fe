function Button({
  children,
  type,
  onClick,
  status = "active",
  classNames = "",
}) {
  const buttonColor =
    status === "active" ? "bg-brand-color-100" : "bg-gray-400";

  return (
    <button
      className={`${buttonColor} text-white px-[23px] h-[42px] rounded-[8px] font-[600] w-fit ${classNames}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
