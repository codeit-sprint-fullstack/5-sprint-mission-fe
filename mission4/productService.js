import axios from "axios";

const instance = axios.create({
    baseURL: "https://sprint-mission-api.vercel.app",
})

/** 상품 목록 조회
 * @param {Object} params - 쿼리 정보
 * @param {int} params.page - 페이지(기본값 : 1)
 * @param {int} params.pageSize - 페이지 사이즈(기본값 : 100)
 * @param {string} params.keyword - 검색 키워드
 */
const getProductList = async (params) => {
    try {
        const response = await instance.get("/products", {
            params
        });
        console.log(response.data);
        return response;

    } catch (err) {
        console.log("error: ", err);
    }
}

/** 상품 상세 조회
 * @param {int} id - 상품 ID
 */
const getProduct = async (id) => {
    try {
        const response = await instance.get(`/products/${id}`);
        console.log(response.data);
        return response;

    } catch (err) {
        console.log("error: ", err.response.data);
    }
}

/** 상품 등록
 * @param {Object} params - 상품 정보
 * @param {string} params.name - 상품 이름
 * @param {string} params.description - 상품 설명
 * @param {int} params.price - 상품 가격
 * @param {string[]} params.tags - 상품 태그 목록
 * @param {string[]} params.images - 상품 이미지 목록
 */
const createProduct = async (params) => {
    try {
        const response = await instance.post("/products", params);
        console.log(response.data);
        return response;

    } catch (err) {
        console.log("error: ", err.response.data);
    }
}

/** 상품 수정
 * @param {int} id - 상품 ID
 * @param {Object} params - 상품 정보
 * @param {string} params.name - 상품 이름
 * @param {string} params.description - 상품 설명
 * @param {int} params.price - 상품 가격
 * @param {string[]} params.tags - 상품 태그 목록
 * @param {string[]} params.images - 상품 이미지 목록
 */
const patchProduct = async (id, params) => {
    try {
        const response = await instance.patch(`/products/${id}`, params);
        console.log(response.data);
        return response;

    } catch (err) {
        console.log("error: ", err.response.data);
    }
}

/** 상품 삭제
 * @param {int} id - 상품 ID
 * @returns 상품 삭제 성공 시 성공 메시지 콘솔에 출력
 */
const deleteProduct = async (id) => {
    try {
        const response = await instance.delete(`/products/${id}`);

        console.log("상품을 삭제했습니다.")
        return response;

    } catch (err) {
        console.log("error: ", err.response.data);
    }
}

export { getProductList, getProduct, createProduct, patchProduct, deleteProduct } 