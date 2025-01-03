import axios from "axios";

const articleAxios = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/articles",
  headers: { "Content-Type": "application/json" },
});

/**
 * @param {number} [page=1] - 조회할 페이지 번호 (기본값: 1).
 * @param {number} [pageSize=100] - 한 페이지에 포함될 기사 수 (기본값: 100).
 * @param {string} [keyword=" "] - 검색 키워드 (기본값: 공백 문자열).
 * @returns {Promise<Object>} - 검색된 기사 데이터를 포함한 JSON 객체를 반환합니다.
 */
const getArticleList = (page = 1, pageSize = 100, keyword = " ") => {
  const params = { page, pageSize, keyword };
  return articleAxios
    .get("", { params })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("API 호출 실패");
      }
      return res.data;
    })
    .catch((error) => {
      console.error("error : ", error.message);
      return Promise.reject(error);
    });
};

/**
 * @param {number} id - 조회할 상품의 고유 ID.
 */
const getArticle = async (id) => {
  try {
    const res = await articleAxios(`/${id}`);
    return res.data;
  } catch (error) {
    console.log("error : ", error);
    return error;
  }
};

/**
 * @param {string} [title=""] - 생성할 상품의 제목 (기본값: 빈 문자열).
 * @param {string} [content=""] - 생성할 상품의 내용 (기본값: 빈 문자열).
 * @param {string} [image=""] - 생성할 상품의 이미지 URL (기본값: 빈 문자열).
 */
const createArticle = async (title = "", content = "", image = "") => {
  const data = { title, content, image };
  try {
    const res = await articleAxios.post("", data);
    return res;
  } catch (error) {
    console.log("error :", error);
    return error;
  }
};

/**
 * @param {number} [id=0] - 수정할 상품의 고유 ID (기본값: 0).
 * @param {string} [title=""] - 수정할 상품의 제목 (기본값: 빈 문자열).
 * @param {string} [content=""] - 수정할 상품의 내용 (기본값: 빈 문자열).
 * @param {string} [image=""] - 수정할 상품의 이미지 URL (기본값: 빈 문자열).
 */
const patchArticle = async (id = 0, title = "", content = "", image = "") => {
  const data = { title, content, image };
  try {
    const res = await articleAxios.patch(`/${id}`, data);
    return res.data;
  } catch (error) {
    console.log("error :", error);
    return error;
  }
};

/**
 * @param {number} id - 삭제할 상품의 고유 ID.
 */
const deleteArticle = async (id) => {
  try {
    const res = await articleAxios.delete(`/${id}`);
    return res;
  } catch (error) {
    console.log("error :", error);
    return error;
  }
};

const article = {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
};

export { article };
