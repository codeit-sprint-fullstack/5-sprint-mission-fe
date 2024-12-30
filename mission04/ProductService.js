import { instance, errHandle } from "./main.js";

/** 상품 리스트 조회
* @param         { page:1, pageSize:100, keyword:"테스트" }
* @description - { 페이지,     페이지사이즈,     검색키워드  }
*                {  int          int           String    }
**/
export async function getProductList(param) {
  try {
    let response = await instance.get(`/products/?page=${param.page}&pageSize=${param.pageSize}&keyword=${param.keyword}`);
    console.log(response.data);
    return response;
  } catch (err) {
    const errmessage = errHandle(err);
    return err;
  }
}

/** 상품 상세 조회
* @param           id
* @description - 아이디
*                 int
**/
export async function getProduct(id) {
  try {
    let response = await instance.get(`/products/${id}`);
    console.log(response.data);
    return response;
  } catch (err) {
    const errmessage = errHandle(err);
    return err;
  }
}

/** 상품 생성
* @param         { name  ,  description  ,  price  ,  manufacturer  ,  tags  ,  images }
* @description - { 상품명 ,    상품 설명   ,   가격   ,      제조사     ,  태그   ,  이미지  }
*                  String      String        int          String       Array     Array
**/
export async function createProduct(param) {
  try {
    let response = await instance.post("/products", {
      name: param.name,
      description: param.description,
      price: param.price,
      manufacturer: param.manufacturer,
      tags: param.tags,
      images: param.images,
    });
    console.log(response.data);
    return response;
  } catch (err) {
    const errmessage = errHandle(err);
    return err;
  }
}

/** 상품 수정
* @param         { name  ,  description  ,  price  ,  manufacturer  ,  tags  ,  images }
* @description - { 상품명 ,    상품 설명   ,   가격   ,      제조사     ,  태그   ,  이미지  }
*                  String      String        int          String       Array     Array
**/
export async function patchProduct(param, id) {
  try {
    let response = await instance.patch(`/products/${id}`, {
      name: param.name,
      description: param.description,
      price: param.price,
      manufacturer: param.manufacturer,
      tags: param.tags,
      images: param.images,
    });
    console.log(response.data);
    return response;
  } catch (err) {
    const errmessage = errHandle(err);
    return err;
  }
}

/** 상품 삭제
* @param           id
* @description - 아이디
*                  int
**/
export async function deleteProduct(id) {
  try {
    let response = await instance.delete(`/${id}`);
    console.log(response.data);
    return response;
  } catch (err) {
    const errmessage = errHandle(err);
    return err;
  }
}

export const productService = {
  getProduct,
  getProductList,
  createProduct,
  patchProduct,
  deleteProduct,
};


