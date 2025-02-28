import { useMediaQuery } from "shared/hooks/useMediaQuery";
import "./style.css";

const HomeContent = ({ children, align, img, onClick }) => {
  const media = useMediaQuery();
  const isAlignLeft = align === "left";
  const isPc = media === "pc";
  const containerAlignItem = isPc
    ? "center"
    : isAlignLeft
    ? "flex-start"
    : "flex-end";
  const containerStyle = {
    display: "flex",
    alignItems: containerAlignItem,
  };

  return (
    <section className="home-content__wrapper">
      <div
        className="home-content__container"
        style={containerStyle}
        onClick={onClick}
      >
        {!isPc && <img src={img} alt="" />}
        {!isAlignLeft && <div className="home-content__text">{children}</div>}
        {isPc && <img src={img} alt="" />}
        {isAlignLeft && <div className="home-content__text">{children}</div>}
      </div>
    </section>
  );
};

export default HomeContent;
