import Feature from "./components/Feature.jsx";
import TopBanner from "./components/TopBanner.jsx";
import BottomBanner from "./components/BottomBanner.jsx";
import featureOne from "../../assets/images/landingPage/featureOne.png";
import featureTwo from "../../assets/images/landingPage/featureTwo.png";
import featureThree from "../../assets/images/landingPage/featureThree.png";

export default function LandingPage() {
  return (
    <div>
      <TopBanner />
      <div className="flex flex-col gap-[40px] md:gap-[52px] xl:gap-[276px] max-w-[1000px] mx-auto">
      <Feature
        image={featureOne}
        label="Hot Item"
        title="인기 상품을 확인해 보세요"
        description="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
      />
      <Feature
        image={featureTwo}
        label="Search"
        title="구매를 원하는 상품을 검색하세요"
        description="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
      />
      <Feature
        image={featureThree}
        label="Register"
        title="판매를 원하는 상품을 등록하세요"
        description="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
      />
      </div>
      <BottomBanner />
    </div>
  );
}
