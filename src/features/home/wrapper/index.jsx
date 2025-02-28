import "./style.css";

const HomeWrapper = ({ children, img }) => {
  return (
    <section className="home-wrapper">
      <div className="home-container">
        <div>{children}</div>
        <img src={img} alt="" />
      </div>
    </section>
  );
};

export default HomeWrapper;
