import bottomBanner from '../../../assets/images/landingPage/bottomBanner.png';

export default function BottomBanner() {
    return (
        <div className="w-full bg-[#CFE5FF] mt-[80px] md:mt-[56px] xl:mt-[138px]">
          <div className="max-w-[1110px] mx-auto xl:flex xl:items-end">
            <p className="text-[32px] text-center font-bold text-[#374151] pt-[120px] md:text-[40px] whitespace-nowrap xl:text-left xl:mb-[170px]">믿을 수 있는<br />판다마켓 중고 거래</p>
            <img src={bottomBanner} alt="bottom banner image" className="w-full mt-[130px]"/>
          </div>
        </div>
    )
}