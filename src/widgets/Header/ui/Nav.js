import NavItem from "features/NavItem";

const Nav = () => {
  return (
    <div>
      <NavItem link={"/comunity"}>자유게시판</NavItem>
      <NavItem link={"/"}>중고마켓</NavItem>
    </div>
  );
};

export default Nav;
