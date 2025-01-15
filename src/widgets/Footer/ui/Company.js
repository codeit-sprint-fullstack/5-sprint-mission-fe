const Company = () => {
  const style = {
    fontSize: "16px",
    fontWeight: "400",
    color: "#9ca3af",
  };

  const currentYear = new Date().getFullYear();

  return <div style={style}>©codeit - {currentYear}</div>;
};

export default Company;
