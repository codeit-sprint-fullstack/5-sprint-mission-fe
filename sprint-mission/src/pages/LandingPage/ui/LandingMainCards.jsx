import "./LandingMainCards.css";

export function LandingMainCards({ img, badge, title1, title2, desc1, desc2 }) {
  const mainCardClassName = badge === "Search" ? "reverse" : "";

  return (
    <section className="main-cards-wrapper">
      <div className={`main-card ${mainCardClassName}`}>
        <img className="main-imgs" src={img} alt={`${badge} 이미지`} />
        <div className="main-msg-box">
          <p class={`badge ${mainCardClassName}`}>{badge}</p>
          <div className="landing-title-box">
            <span className="landing-title">{title1}</span>
            <span className="landing-title">{title2}</span>
          </div>
          <div className="card-desc-box">
            <p className="card-desc">{desc1}</p>
            <p className="card-desc">{desc2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
