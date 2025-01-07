import { api } from "./setAxiosDefault.js";
// import { REQUIRED_FIELDS } from "./constants.js";
// import { verifyData, verifyRequiredFields } from "./checkError.js";

const isEmpty = (value) =>
  value === null ||
  value === undefined ||
  (typeof value === "string" && value.trim() === "") ||
  value === 0;

const initParams = (params) => {
  // GET method 파라미터 초기화
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };

  params.page = isEmpty(params.page) ? defaultParams.page : params.page;
  params.pageSize = isEmpty(params.pageSize)
    ? defaultParams.pageSize
    : params.pageSize;

  return params;
};

class Service {
  constructor(endPoint) {
    this.endPoint = endPoint;
  }

  getResourceList = async (params) => {
    // 리소스 목록 조회
    initParams(params); // 파라미터 값이 없을 시 초기화

    try {
      const url = this.endPoint;
      const response = await api.get(url, { params });
      const result = response.data;
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  getResource = async (id) => {
    // 리소스 상세 조회
    try {
      const url = this.endPoint + `/${id}`;
      const response = await api.get(url);
      const result = response.data;
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  createResource = async (data) => {
    // 리소스 등록
    // const fields = REQUIRED_FIELDS[this.endPoint]; // 리소스의 필수 필드 가져오기
    // verifyRequiredFields(fields, data); // 필수 필드 확인
    // verifyData(fields, data); // data 검증

    try {
      const url = this.endPoint;
      const response = await api.post(url, data);
      const result = response.data;
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  patchResource = async (id, data) => {
    // 리소스 수정
    // const fields = REQUIRED_FIELDS[this.endPoint]; // 리소스의 필수 필드 가져오기
    // verifyData(fields, data); // data 검증

    try {
      const url = this.endPoint + `/${id}`;
      const response = await api.patch(url, data);
      const result = response.data;
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  deleteResource = async (id) => {
    // 리소스 삭제
    try {
      const url = this.endPoint + `/${id}`;
      await api.delete(url);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default Service;
