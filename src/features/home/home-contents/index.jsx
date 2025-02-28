import HomeContent from "./ui/home-content";
import imgHomeHotItem from "shared/assets/images/home_content_hot_item.png";
import imgHomeSearch from "shared/assets/images/home_content_search.png";
import imgHomeRegister from "shared/assets/images/home_content_register.png";
import { Text } from "shared/ui";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";

const HomeContents = () => {
  const navigate = useNavigate();
  const media = useMediaQuery();
  const isPc = media === "pc";
  const isTablet = media === "tablet";
  const sizeOfTextTitle = isPc ? "4xl" : isTablet ? "3xl" : "2xl";
  const sizeOfTextContent = isPc ? "2xl" : isTablet ? "2lg" : "lg";

  const handleNavigateButton = (to) => {
    navigate(to);
  };

  return (
    <>
      <HomeContent
        align={"left"}
        img={imgHomeHotItem}
        onClick={() => handleNavigateButton("/items")}
      >
        <Text
          size={"2lg"}
          weight={"bold"}
          style={{ color: "#3692ff", marginBottom: "12px" }}
        >
          Hot Item
        </Text>
        <Text
          size={sizeOfTextTitle}
          weight={"bold"}
          style={{ color: "#374151", marginBottom: "24px" }}
        >
          인기 상품을{isPc ? <br /> : " "}확인해 보세요
        </Text>
        <Text
          size={sizeOfTextContent}
          weight={"medium"}
          style={{ color: "#374151" }}
        >
          가장 HOT한 중고거래 물품을{isPc ? <br /> : " "}판다 마켓에서 확인해
          보세요
        </Text>
      </HomeContent>
      <HomeContent align={"right"} img={imgHomeSearch}>
        <Text
          size={"2lg"}
          weight={"bold"}
          style={{ color: "#3692ff", marginBottom: "12px", textAlign: "right" }}
        >
          Search
        </Text>
        <Text
          size={sizeOfTextTitle}
          weight={"bold"}
          style={{ color: "#374151", marginBottom: "24px", textAlign: "right" }}
        >
          구매를 원하는{isPc ? <br /> : " "}상품을 검색하세요
        </Text>
        <Text
          size={sizeOfTextContent}
          weight={"medium"}
          style={{ color: "#374151", textAlign: "right" }}
        >
          구매하고 싶은 물품은 검색해서{isPc ? <br /> : " "}쉽게 찾아보세요
        </Text>
      </HomeContent>

      <HomeContent
        align={"left"}
        img={imgHomeRegister}
        onClick={() => handleNavigateButton("/registration")}
      >
        <Text
          size={"2lg"}
          weight={"bold"}
          style={{ color: "#3692ff", marginBottom: "12px" }}
        >
          Register
        </Text>
        <Text
          size={sizeOfTextTitle}
          weight={"bold"}
          style={{ color: "#374151", marginBottom: "24px" }}
        >
          판매를 원하는{isPc ? <br /> : " "}상품을 등록하세요
        </Text>
        <Text
          size={sizeOfTextContent}
          weight={"medium"}
          style={{ color: "#374151" }}
        >
          어떤 물건이든 판매하고 싶은 상품을{isPc ? <br /> : " "}쉽게 등록하세요
        </Text>
      </HomeContent>
    </>
  );
};

export default HomeContents;
