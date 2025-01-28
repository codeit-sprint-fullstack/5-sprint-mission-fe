import homeBottom from "../../../../assets/intro/Img_home_bottom.png";
import Content from "../../../../common/components/Content";
import Title from "../../components/Title";

export default function Section3() {
  return (
    <section className="bg-[#CFE5FF] pt-[143px] tb:pt-[200px] md:pt-[120px]">
      <Content>
        <div className="flex gap-[70px] items-center tb:flex-col tb:gap-[217px] md:gap-[130px]">
          <div className="w-[295px] md:w-[236px]">
            <Title>믿을 수 있는 판다마켓 중고 거래</Title>
          </div>
          <img src={homeBottom} alt="판다마켓" className="w-[746px] h-auto" />
        </div>
      </Content>
    </section>
  );
}
