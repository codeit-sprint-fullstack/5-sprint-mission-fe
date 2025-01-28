function HomeArticleLeftAlign({ image, badge, children }) {
  return (
    <article className="flex justify-center py-[138px]">
      <div className="flex pc:flex-row tablet:flex-col mobile:flex-col justify-center pc:items-center item-start pc: gap-[64px] gap-[20px] pc:w-[988px] w-[588px] pc:bg-[#FCFCFC] bg-white">
        <img src={image} alt={badge} className="w-[588px] h-[444px]" />
        <div className="flex flex-col items-start gap-[12px]">
          <span className="left-0 text-primary-100 font-[700]">{badge}</span>
          <div className="flex flex-col items-start gap-[24px]">{children}</div>
        </div>
      </div>
    </article>
  );
}

export default HomeArticleLeftAlign;
