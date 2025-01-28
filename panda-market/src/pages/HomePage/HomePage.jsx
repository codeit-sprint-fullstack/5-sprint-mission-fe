import homeTopImg from "../../assets/image/Img_home_top.png";
import homeBottomImg from "../../assets/image/Img_home_bottom.png";
import homeImg01 from "../../assets/image/Img_home_01.png";
import homeImg02 from "../../assets/image/Img_home_02.png";
import homeImg03 from "../../assets/image/Img_home_03.png";
import Button from "../../common/Button";
import HomeArticleLeftAlign from "./components/HomeArticleLeftAlign";
import HomeArticleRightAlign from "./components/HomeArticleRightAlign";
import HomeBannerContent from "./components/HomeBannerContent";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main>
      <section className="flex justify-center items-end pc:h-[540px] tablet:h-[744px] mobile:h-[540px] bg-[#CFE5FF]">
        <HomeBannerContent
          image={
            <img
              src={homeTopImg}
              art="Welcome to Panda Market!"
              className="pc:w-[746px] pc:h-[340px] tablet:w-[746px] tablet:h-[340px] mobile:w-[448px] h-[204px]"
            />
          }
        >
          <h1 className="large-txt pc:text-left tablet:text-center mobile:text-center">
            일상의 모든 물건을
            <br /> 거래해 보세요
          </h1>
          <Link to="/items">
            <Button classNames="w-[357px] h-56[px] px-[124px] py-[16px] rounded-[40px] text-[20px] font-[600] leading-[32px]">
              구경하러 가기
            </Button>
          </Link>
        </HomeBannerContent>
      </section>
      <section>
        <HomeArticleLeftAlign image={homeImg01} badge="Hot item">
          <h1 style={{ wordBreak: "keep-all" }} className="large-txt text-left">
            인기 상품을
            <br /> 확인해 보세요
          </h1>
          <p
            style={{ wordBreak: "keep-all" }}
            className="small-txt break-normal text-left"
          >
            가장 HOT한 중고거래 물품을
            <br /> 판다 마켓에서 확인해 보세요
          </p>
        </HomeArticleLeftAlign>
        <HomeArticleRightAlign image={homeImg02} badge="Search">
          <h1
            style={{ wordBreak: "keep-all" }}
            className="large-txt text-right"
          >
            구매를 원하는
            <br /> 상품을 검색하세요
          </h1>
          <p
            style={{ wordBreak: "keep-all" }}
            className="small-txt break-normal text-right"
          >
            구매하고 싶은 물품은 검색해서
            <br /> 쉽게 찾아보세요
          </p>
        </HomeArticleRightAlign>
        <HomeArticleLeftAlign image={homeImg03} badge="Registration">
          <h1 style={{ wordBreak: "keep-all" }} className="large-txt text-left">
            판매를 원하는
            <br /> 상품을 등록하세요
          </h1>
          <p
            style={{ wordBreak: "keep-all" }}
            className="small-txt break-normal text-left"
          >
            어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
          </p>
        </HomeArticleLeftAlign>
      </section>
      <section className="flex justify-center items-end pc:h-[540px] tablet:h-[744px] mobile:h-[540px] bg-[#CFE5FF]">
        <HomeBannerContent
          image={
            <img
              src={homeBottomImg}
              art="Welcome to Panda Market!"
              className="pc:w-[746px] pc:h-[397px] tablet:w-[746px] tablet:h-[397px] w-[375px] h-[198px]"
            />
          }
        >
          <h1 className="large-txt pc:text-left tablet:text-center mobile:text-center">
            믿을 수 있는
            <br /> 판다마켓 중고 거래
          </h1>
        </HomeBannerContent>
      </section>
    </main>
  );
}

export default HomePage;
