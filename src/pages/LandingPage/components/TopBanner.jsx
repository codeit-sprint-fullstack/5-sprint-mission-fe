import topBanner from "../../../assets/images/landingPage/topBanner.png";
import { useNavigate } from "react-router-dom";

export default function TopBanner() {
  const navigate = useNavigate();

  const moveOnItemsPage = () => {
    navigate("/items");
  }

  return (
    <div className="w-full bg-[#CFE5FF]">
      <div className="mx-auto mb-[52px] max-w-[1110px] items-center justify-center md:mb-[24px] xl:mb-[138px] xl:flex">
        <div className="flex flex-col items-center xl:items-start">
          <div className="xl: pt-[48px] text-center text-[32px] font-bold text-[#374151] md:flex md:gap-2 md:pt-[84px] xl:flex-col xl:items-start">
            <p>일상의 모든 물건을</p>
            <p>거래해 보세요</p>
          </div>
          <button onClick={moveOnItemsPage} className="mt-[18px] whitespace-nowrap rounded-3xl bg-[#3692FF] px-[71px] py-[11px] text-[18px] font-bold text-white md:px-[124px] md:text-[20px] xl:mt-[32px]">
            구경하러 가기
          </button>
        </div>
        <img src={topBanner} alt="topBanner" className="mt-[130px] w-full" />
      </div>
    </div>
  );
}
