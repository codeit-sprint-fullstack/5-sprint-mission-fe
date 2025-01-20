import React from "react";
import { Link } from "react-router-dom";
import logo from "../../components/img/판다 얼굴.png";
import heroImage from "../../components/img/판다마켓.png";
import topBannerImg from "../../components/img/TopBannerImg.png";
import MiddleImg1 from "../../components/img/middleImg_01.png";
import MiddleImg2 from "../../components/img/middleImg_02.png";
import MiddleImg3 from "../../components/img/middleImg_03.png";
import bottomBannerImg from "../../components/img/bottomBannerImg.png";
import { Footer } from "../../components/Share/footer/footer";

const Main = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-96 max-md:px-8 bg-white border-b border-gray-200 z-50">
        <Link className="flex gap-3" to="/">
          <img src={logo} alt="판다마켓 홈" className="w-10 max-sm:w-0" />
          <img
            src={heroImage}
            alt="판다마켓 홈"
            className="w-28 object-contain"
          />
        </Link>
        <Link
          to="/login"
          className="bg-blue-500 text-white font-semibold rounded-lg px-8 py-3 hover:bg-blue-700"
        >
          로그인
        </Link>
      </header>

      <main className="mt-16">
        <section className="h-[540px] flex bg-[#cfe5ff]  ">
          <div className="flex flex-row items-end max-w-6xl mx-auto max-md:flex-col max-md:justify-between max-md:items-center">
            <div className="flex flex-col justify-center h-full pt-32 max-md:pt-0">
              <h1 className="text-4xl font-bold whitespace-nowrap leading-tight mb-8 max-md:mb-0">
                일상의 모든 물건을
                <br />
                거래해 보세요
              </h1>

              <Link
                to="/items"
                className="flex justify-center items-center bg-blue-500 text-white font-bold rounded-full  py-4 text-2xl hover:bg-blue-700"
              >
                구경하러 가기
              </Link>
            </div>
            <img className="w-3/5 max-md:w-full " src={topBannerImg} />
          </div>
        </section>

        <section className="max-w-6xl mx-auto py-20">
          <div className="flex max-md:flex-col items-center gap-10 mb-20">
            <img
              src={MiddleImg1}
              alt="인기 상품"
              className="w-1/2 max-md:w-full"
            />
            <div className="max-md:w-full max-md:text-left">
              <h2 className="text-blue-500 text-lg font-bold mb-4">Hot item</h2>
              <h1 className="text-4xl font-bold leading-tight">
                인기 상품을 <br /> 확인해 보세요
              </h1>
              <p className="text-lg mt-6">
                가장 HOT한 중고거래 물품을
                <br />
                판다마켓에서 확인해 보세요
              </p>
            </div>
          </div>
          <div className="flex max-md:flex-col  items-center gap-10 mb-20 flex-row-reverse">
            <img
              src={MiddleImg2}
              alt="검색 기능"
              className="w-1/2 max-md:w-full"
            />
            <div className="text-right max-md:w-full ">
              <h2 className="text-blue-500 text-lg font-bold mb-4">Search</h2>
              <h1 className="text-4xl font-bold leading-tight">
                구매를 원하는
                <br />
                상품을 검색하세요
              </h1>
              <p className="text-lg mt-6">
                구매하고 싶은 물품은 검색해서
                <br />
                쉽게 찾아보세요
              </p>
            </div>
          </div>
          <div className="flex max-md:flex-col items-center gap-10">
            <img
              src={MiddleImg3}
              alt="판매 상품 등록"
              className="w-1/2 max-md:w-full"
            />
            <div className="max-md:w-full text-left">
              <h2 className="text-blue-500 text-lg font-bold mb-4">Register</h2>
              <h1 className="text-4xl font-bold leading-tight">
                판매를 원하는
                <br />
                상품을 등록하세요
              </h1>
              <p className="text-lg mt-6">
                어떤 물건이든 판매하고 싶은 상품을
                <br />
                쉽게 등록하세요
              </p>
            </div>
          </div>
        </section>

        <section className="h-[540px] flex  bg-[#cfe5ff]  ">
          <div className="flex flex-row items-end  max-w-6xl mx-auto max-md:flex-col max-md:justify-between max-md:items-center">
            <div className="flex flex-col justify-center h-full pt-32 max-md:pt-0">
              <h1 className="text-4xl font-bold leading-tight ">
                믿을 수 있는
                <br />
                판다마켓 중고거래
              </h1>
            </div>
            <img className="w-3/5  max-md:w-full" src={bottomBannerImg} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Main;
