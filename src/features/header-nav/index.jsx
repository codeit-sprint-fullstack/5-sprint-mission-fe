import "./style.css";
import { NavLink } from "react-router-dom";
import { Text } from "shared/ui";

export const HeaderNav = ({ active }) => {
  return (
    <nav className="header-nav">
      <NavLink
        to="/comunity"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <Text size={"2lg"} weight={"bold"}>
          자유게시판
        </Text>
      </NavLink>
      <NavLink
        to="/items"
        className={({ isActive }) => (isActive ? "active-link" : "")}
      >
        <Text size={"2lg"} weight={"bold"}>
          중고마켓
        </Text>
      </NavLink>
    </nav>
  );
};
