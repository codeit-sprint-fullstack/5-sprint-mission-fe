import "./style.css";
import { Text } from "shared/ui";
import { NavLink } from "react-router-dom";

const FooterNoticeLink = () => {
  return (
    <div className="notice-link">
      <NavLink to="/policy" className="notice-link-item">
        <Text size={"lg"} weight={"regular"} style={{ color: "#e5e7eb" }}>
          Privacy Policy
        </Text>
      </NavLink>
      <NavLink to="/faq" className="notice-link-item">
        <Text size={"lg"} weight={"regular"} style={{ color: "#e5e7eb" }}>
          FAQ
        </Text>
      </NavLink>
    </div>
  );
};

export default FooterNoticeLink;
