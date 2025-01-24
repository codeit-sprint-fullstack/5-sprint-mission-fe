import "./style.css";

const InputBox = ({
  isTextarea,
  type,
  name,
  value,
  onChange,
  onBlur,
  onKeyDown,
  placeholder,
  style,
}) => {
  const Component = isTextarea ? "textarea" : "input";
  return (
    <Component
      className="input-box"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      style={style}
    ></Component>
  );
};

export default InputBox;
