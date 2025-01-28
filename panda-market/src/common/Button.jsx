function Button({ children, onClick, classNames, isActive = true, ...props }) {
  const buttonColor = isActive ? "bg-primary-100" : "bg-secondary-400";
  return (
    <button
      onClick={onClick}
      className={`${buttonColor} text-secondary-100 ${classNames}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
