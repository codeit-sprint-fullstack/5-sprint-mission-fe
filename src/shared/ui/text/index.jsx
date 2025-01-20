import "./style.css";

const Text = ({ children, type = "div", size, weight, style }) => {
  const Component = type === "div" ? "div" : "span";
  const className = `text text-${size} text-${weight}`;

  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
};

export default Text;
