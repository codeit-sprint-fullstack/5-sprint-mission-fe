import localFont from "next/font/local";

export const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2", // 폰트 파일 경로 (올바른 경로 확인 필요)
  display: "swap", // 폰트 로딩 전략
  weight: "100 900", // 폰트 가중치
  variable: "--font-pretendard", // CSS 변수로 폰트 사용
});
