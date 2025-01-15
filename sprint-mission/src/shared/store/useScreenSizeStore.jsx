import { create } from "zustand";
import { BREAKPOINTS } from "../../utils/constants";

/**
 * 반응형 분기 시점에 대한 윈도우 사이즈를 텍스트로 반환
 * @returns {string} "DESKTOP" || "TABLET" || "MOBILE"
 */
const getScreenSize = () => {
  const width = window.innerWidth;
  if (width < BREAKPOINTS.MOBILE) return "MOBILE";
  if (width < BREAKPOINTS.TABLET) return "TABLET";
  return "DESKTOP";
};

//스크린사이즈 변경되면 상태 업데이트
export const useScreenSizeStore = create((set, get) => ({
  //상태
  screenSize: getScreenSize(),

  //액션
  updateScreenSize: () => {
    const currentScreenSize = get().screenSize; //스토어에 저장된 현재 스크린사이즈
    const newSize = getScreenSize(); //액션이 일어났을 때 새로 받아온 스크린사이즈
    console.log("현재 스크린사이즈: ", currentScreenSize);
    console.log("스크린사이즈 변경 감지, 새로운 스크린사이즈: ", newSize);

    if (newSize !== currentScreenSize) {
      console.log("!!!!!!이걸로 바꿔줘!!!!!", newSize);
      set({ screenSize: newSize });
      console.log("변경! 스크린사이즈 업데이트: ", get().screenSize); //set이후 다시 새로운 상태 가져옴: 업데이트가 잘 됐는지 확인
    }
  },
}));

//파일이름뭘로하지. 스토어랑 훅이랑 분리해야되나 고민~
//스토어에서 변경된 스크린사이즈 불러오기
export const useMediaQuery = () =>
  useScreenSizeStore((state) => state.screenSize);

//이벤트 리스너 디바운스
//창 크기를 빠르게 변경해도 마지막 크기 변경 후(창 크기 변경을 멈추면) 0.2초 뒤에 한번만 업데이트 액션 호출됨.
let timeId = 0;
window.addEventListener("resize", () => {
  clearTimeout(timeId);
  timeId = setTimeout(() => {
    useScreenSizeStore.getState().updateScreenSize();
  }, 200);
});
