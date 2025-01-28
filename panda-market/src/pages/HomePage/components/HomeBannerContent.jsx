function HomeBannerContent({ children, image }) {
  return (
    <div className="flex items-center gap-[7px] pc:flex-row flex-col">
      <div className="flex flex-col gap-[32px] pb-[60px]">{children}</div>
      {image}
    </div>
  );
}

export default HomeBannerContent;
