import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { HeaderNav } from "features";
import { GeneralItems } from "widgets/general-items";

const Market = () => {
  return (
    <>
      <Header>
        <HeaderNav />
      </Header>
      <GeneralItems />
      <Footer />
    </>
  );
};

export default Market;
