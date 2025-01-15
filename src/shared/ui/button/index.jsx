import "./style.css";

const Button = ({ children, handleClick, size, disabled = false }) => {
  const className = `btn btn-${size} ${disabled ? "btn-disabled" : ""}`;
  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
