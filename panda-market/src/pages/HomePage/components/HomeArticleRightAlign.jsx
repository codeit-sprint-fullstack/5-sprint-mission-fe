function HomeArticleRightAlign({ image, badge, children }) {
  return (
    <article className="flex justify-center pc:py-[138px]">
      <div className="flex pc:flex-row tablet:flex-col mobile:flex-col justify-center pc:items-center item-end pc: gap-[64px] gap-[20px] pc:w-[988px] w-[588px] pc:bg-[#FCFCFC] bg-white">
        <div className="order-2 pc:order-1 flex flex-col items-end gap-[12px]">
          <span className="left-0 text-primary-100 font-[700]">{badge}</span>
          <div className="flex flex-col items-end gap-[24px]">{children}</div>
        </div>
        <img
          src={image}
          alt={badge}
          className="order-1 pc:order-2 w-[588px] h-[444px]"
        />
      </div>
    </article>
  );
}

export default HomeArticleRightAlign;
