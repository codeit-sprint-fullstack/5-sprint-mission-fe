import axios from "axios";

//XXX: 백엔드 제작해서 배포한 링크로 수정한 상태.
export const instance = axios.create({
  baseURL: "https://panda-market-prod.onrender.com",
});
