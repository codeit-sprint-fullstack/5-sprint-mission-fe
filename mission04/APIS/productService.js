// 상품 APIs
import Service from "./service.js";

const endPoint = "products";
const ProductService = new Service(endPoint); // 상품 서비스 객체 생성

const getProductList = ProductService.getResourceList;
const getProduct = ProductService.getResource;
const createProduct = ProductService.createResource;
const patchProduct = ProductService.patchResource;
const deleteProduct = ProductService.deleteResource;

export {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
};
