import { useEffect } from 'react';
import './css/Main.css';
import servSectionImgOne from '../../../../assets/Img_home_01.png'
import servSectionImgTwo from '../../../../assets/Img_home_02.png'
import servSectionImgThree from '../../../../assets/Img_home_03.png'
import { ServSection } from './ServSection';
import { ReverseServSection } from './ReverseSection';
import { MainSection } from './MainSection';
import { BottomSection } from './BottomSection';
export function Main({ userEnv, setPageFocus }) {
  useEffect(() => {
    setPageFocus('main');
  }, []);
  return (
    <>
      <MainSection userEnv={userEnv} />
      <ServSection userEnv={userEnv} servSectionImg={servSectionImgOne} servTag="Hot Item" servTitleOne="인기 상품을" servTitleTwo="확인해 보세요" servDescriptionOne="가장 HOT한 중고거래 물품을" servDescriptionTwo="판다 마켓에서 확인해 보세요"/>
      <ReverseServSection userEnv={userEnv} servSectionImg={servSectionImgTwo} servTag="Search" servTitleOne="구매를 원하는" servTitleTwo="상품을 검색하세요" servDescriptionOne="구매하고 싶은 물품은 검색해서" servDescriptionTwo="쉽게 찾아보세요" />
      <ServSection userEnv={userEnv} servSectionImg={servSectionImgThree} servTag="Register" servTitleOne="판매를 원하는" servTitleTwo="상품을 등록하세요" servDescriptionOne="어떤 물건이든 판매하고 싶은 상품을" servDescriptionTwo="쉽게 등록하세요" />
      <BottomSection userEnv={userEnv} />
    </>
  );
}
