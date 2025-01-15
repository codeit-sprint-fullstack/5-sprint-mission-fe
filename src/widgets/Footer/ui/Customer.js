import { NavLink } from "react-router-dom";
import "./Customer.css";

const CustomerCenter = () => {
  return (
    <div className="footer__customer">
      <NavLink to={"/policy"}>Privacy Policy</NavLink>
      <NavLink to={"/faq"}>FAQ</NavLink>
    </div>
  );
};

export default CustomerCenter;
