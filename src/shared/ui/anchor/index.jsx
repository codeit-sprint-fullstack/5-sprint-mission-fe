import "./style.css";

const Anchor = ({ children, href, target, style }) => {
  return (
    <a className="anchor" href={href} target={target} style={style}>
      {children}
    </a>
  );
};

export default Anchor;
