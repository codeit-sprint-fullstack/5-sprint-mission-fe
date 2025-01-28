import Content from "../../../../common/components/Content";
import Card from "../../components/Card";
import imgHotItem from "../../../../assets/intro/Img_hot-item.png";
import imgSearch from "../../../../assets/intro/Img_search.png";
import imgRegister from "../../../../assets/intro/Img_register.png";

const INFO_CARD = {
  HotItem: {
    image: imgHotItem,
    badge: "Hot item",
    description: "인기 상품을 확인해 보세요",
    subDescription: "가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요",
    isLeft: true,
  },
  Search: {
    image: imgSearch,
    badge: "Search",
    description: "구매를 원하는 상품을 검색하세요",
    subDescription: "구매하고 싶은 물품은 검색해서 쉽게 찾아보세요",
    isLeft: false,
  },
  Register: {
    image: imgRegister,
    badge: "Register",
    description: "판매를 원하는 상품을 등록하세요",
    subDescription: "어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요",
    isLeft: true,
  },
};

export default function Section2() {
  return (
    <section className="bg-white py-[138px]">
      <Content>
        <div className="flex flex-col gap-[276px]">
          {Object.keys(INFO_CARD).map((key) => (
            <Card key={key} {...INFO_CARD[key]} />
          ))}
        </div>
      </Content>
    </section>
  );
}
