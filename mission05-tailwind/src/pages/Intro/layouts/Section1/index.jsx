import { useNavigate } from "react-router-dom";
import homeLanding from "../../../../assets/intro/Img_home_landing.png";
import Content from "../../../../common/components/Content";
import Title from "../../components/Title";

export default function Section1() {
  const nav = useNavigate();

  const handleClick = () => {
    nav("/items");
  };

  return (
    <section className="bg-[#CFE5FF] pt-[200px]">
      <Content>
        <div className="flex gap-[7px] tb:flex-col tb:gap-[211px] md:gap-[132px]">
          <div className="flex flex-col gap-[32px] justify-center width-[360px] tb:width-[512px] tb:gap-[24px] tb:items-center md:width-[240px] md:gap-[18px]">
            <Title>일상의 모든 물건을 거래해 보세요</Title>
            <button
              className="max-w-[357px] bg-[#3692FF] text-[#F9FAFB] text-[1.25rem] font-semibold py-[12px] px-[124px] rounded-[40px] mb-[100px] tb:mb-0"
              onClick={handleClick}
            >
              구경하러 가기
            </button>
          </div>

          <img src={homeLanding} alt="판다마켓" className="w-[746px] h-auto" />
        </div>
      </Content>
    </section>
  );
}
