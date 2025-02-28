import "./style.css";

const Button = ({ children, handleClick, size, disabled = false, type }) => {
  const className = `btn btn-${size} ${disabled ? "btn-disabled" : ""}`;
  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
