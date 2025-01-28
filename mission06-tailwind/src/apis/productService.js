// 상품 APIs
import Service from "./service.js";

const endPoint = "products";
const ProductService = new Service(endPoint);

// 상품 API 메서드 내보내기
export const {
  getResourceList: getProductList,
  getResource: getProduct,
  createResource: createProduct,
  updateResource: updateProduct,
  deleteResource: deleteProduct,
} = ProductService;
