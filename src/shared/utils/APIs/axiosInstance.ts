import axios, { AxiosInstance } from "axios";

// TODO: 상품이랑 뭐 이런거 다 이번 미션걸로 업데이트되면 이 폴더 지우기
// 백엔드 미션에서 제작한 서버로 요청하는 instance
//백엔드 제작해서 배포한 링크로 수정한 상태.
export const instance: AxiosInstance = axios.create({
  baseURL: "https://panda-prisma.onrender.com",
});
