import { sprintApi } from "./axiosDefault.js";
import { isEmpty } from "./checkError.js";
import { REQUIRED_FIELDS } from "./constants.js";
import { verifyData, verifyRequiredFields } from "./checkError.js";

const initParams = (params) => {
  // GET method 파라미터 초기화
  const defaultParams = {
    page: 1,
    pageSize: 1000,
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

    const url = this.endPoint;
    const response = await sprintApi.get(url, { params });
    const result = response.data;

    return result;
  };

  getResource = async (id) => {
    // 리소스 상세 조회
    const url = this.endPoint + `/${id}`;
    const response = await sprintApi.get(url);
    const result = response.data;

    return result;
  };

  createResource = async (data) => {
    // 리소스 등록
    const fields = REQUIRED_FIELDS[this.endPoint]; // 리소스의 필수 필드 가져오기
    verifyRequiredFields(fields, data); // 필수 필드 확인
    verifyData(fields, data); // data 검증

    try {
      const url = this.endPoint;
      const response = await sprintApi.post(url, data);
      const result = response.data;
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  patchResource = async (id, data) => {
    // 리소스 수정
    const fields = REQUIRED_FIELDS[this.endPoint]; // 리소스의 필수 필드 가져오기
    verifyData(fields, data); // data 검증

    try {
      const url = this.endPoint + `/${id}`;
      const response = await sprintApi.patch(url, data);
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
      await sprintApi.delete(url);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export default Service;
