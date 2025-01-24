import { HomeWrapper } from "features";
import { Button, Text } from "shared/ui";
import imgHomeTop from "shared/assets/images/home_wrapper_top.png";
import imgHomeBottom from "shared/assets/images/home_wrapper_bottom.png";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { HomeContents } from "features";
import { Header } from "widgets/header";
import { Footer } from "widgets/footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const media = useMediaQuery();
  const isPc = media === "pc";
  const isTablet = media === "tablet";
  const isMobile = media === "mobile";

  const handleNavigateButton = (to) => {
    navigate(to);
  };

  return (
    <>
      <Header />
      <HomeWrapper img={imgHomeTop}>
        <Text
          size={isMobile ? "3xl" : "4xl"}
          weight={"bold"}
          style={{
            textAlign: isPc ? "left" : "center",
          }}
        >
          일상의 모든 물건을{isTablet ? " " : <br />}거래해 보세요
        </Text>
        <Button
          size={isMobile ? "md" : "lg"}
          handleClick={() => handleNavigateButton("/items")}
        >
          <Text size={"xl"} weight={"semibold"} style={{ color: "#f9fafb" }}>
            구경하러 가기
          </Text>
        </Button>
      </HomeWrapper>
      <HomeContents />
      <div style={{ backgroundColor: "#fcfcfc", padding: "69px 0" }}></div>
      <HomeWrapper img={imgHomeBottom}>
        <Text
          size={isMobile ? "3xl" : "4xl"}
          weight={"bold"}
          style={{
            textAlign: isPc ? "left" : "center",
          }}
        >
          믿을 수 있는
          <br />
          판다마켓 중고 거래
        </Text>
      </HomeWrapper>
      <Footer />
    </>
  );
};

export default Home;
