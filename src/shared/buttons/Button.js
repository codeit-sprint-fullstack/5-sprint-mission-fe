import "./Button.css";

const Button = ({ children, size, handleClick, disabled = false }) => {
  const classNames = `btn btn-${size} ${disabled ? "btn-disabled" : ""}`;

  return (
    <button onClick={handleClick} className={classNames} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
