import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { HeaderNav } from "features";
import { RegistrationItems } from "widgets/registration-items";

const Registration = () => {
  return (
    <>
      <Header>
        <HeaderNav />
      </Header>
      <RegistrationItems />
      <Footer />
    </>
  );
};

export default Registration;
