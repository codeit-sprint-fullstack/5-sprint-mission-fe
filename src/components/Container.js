const Container = ({ className = "", page, ...props }) => {
  const classNames = `mx-auto w-full max-w-[1200px] px-4 md:px-6 ${
    page ? "mt-4 md:mt-6 mb-[91px] md:mb-[19px] lg:mb-[293px] flex-1" : ""
  } ${className}`;
  return <div className={classNames} {...props} />;
};

export default Container;
