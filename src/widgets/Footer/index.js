import Company from "./ui/Company";
import Customer from "./ui/Customer";
import SnsLink from "./ui/SnsLink";
import "./index.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer">
          <Company></Company>
          <Customer></Customer>
          <SnsLink></SnsLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
