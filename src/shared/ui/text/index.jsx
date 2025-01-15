import "./style.css";

const Text = ({ children, type = "div", color, size, weight }) => {
  const needDiv = type === "div";
  const className = `text text-${size} text-${weight}`;
  return (
    <>
      {needDiv && (
        <div className={className} style={{ color: color }}>
          {children}
        </div>
      )}
      {!needDiv && (
        <span className={className} style={{ color: color }}>
          {children}
        </span>
      )}
    </>
  );
};

export default Text;
