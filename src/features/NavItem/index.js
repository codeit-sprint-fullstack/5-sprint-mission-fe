import { NavLink } from "react-router-dom";
import "./index.css";

const NavItem = ({ children, link }) => {
  return (
    <NavLink className="nav-item" to={link}>
      {children}
    </NavLink>
  );
};

export default NavItem;
