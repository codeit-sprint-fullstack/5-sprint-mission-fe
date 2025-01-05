import articleAPI from "./article.js";
import productAPI from "./product.js";

// .then()과 .catch()를 사용하여 게시글 목록 가져오기
// 게시글 목록을 가져오고 상태 코드가 2XX가 아닐 경우 오류를 처리.
articleAPI
  .getArticleList({ page: 1, pageSize: 10, keyword: "example" })
  .then((response) => {
    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }
    return response.json();
  })
  .then((data) => {
    if (data) {
      console.log("Article List:", data);
    }
  })
  .catch((error) => {
    console.error("Failed to fetch article list:", error.message);
  });

// .then()과 .catch()를 사용하여 ID로 특정 게시글 가져오기
// ID로 특정 게시글을 가져오고 상태 코드가 2XX가 아닐 경우 오류를 처리.
articleAPI
  .getArticle({ id: 123 })
  .then((response) => {
    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }
    return response.json();
  })
  .then((data) => {
    if (data) {
      console.log("Article:", data);
    }
  })
  .catch((error) => {
    console.error("Failed to fetch article:", error.message);
  });

// .then()과 .catch()를 사용하여 ID로 게시글 삭제하기
// ID로 게시글을 삭제하고 상태 코드가 2XX가 아닐 경우 오류를 처리.
articleAPI
  .deleteArticle({ id: 123 })
  .then((response) => {
    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return;
    }
    return response.json();
  })
  .then((data) => {
    if (data) {
      console.log("Deleted Article:", data);
    }
  })
  .catch((error) => {
    console.error("Failed to delete article:", error.message);
  });

// try/catch를 사용하여 상품 목록 가져오기
// 상품 목록을 가져오고 데이터를 로그로 출력하거나 오류가 발생하면 처리
const fetchProductList = async () => {
  try {
    const params = { page: 1, pageSize: 10, keyword: "example" };

    // 상품 목록 가져오기
    const response = await productAPI.getProductList(params);

    // 가져온 상품 데이터를 로그로 출력
    console.log("Product List:", response);
  } catch (error) {
    // 오류 처리 및 오류 메시지 출력
    console.error("Failed to fetch product list:", error.message);
  }
};

// try/catch를 사용하여 ID로 특정 상품 가져오기
// ID로 특정 상품을 가져오고 데이터를 로그로 출력하거나 오류가 발생하면 처리
const fetchProduct = async (id) => {
  try {
    const response = await productAPI.getProduct({ id });

    // 가져온 상품 데이터를 로그로 출력
    console.log("Product:", response);
  } catch (error) {
    // 오류 처리 및 오류 메시지 출력
    console.error("Failed to fetch product:", error.message);
  }
};

// try/catch를 사용하여 상품 생성하기
// 새로운 상품을 생성하고 결과를 로그로 출력하거나 오류가 발생하면 처리
const createNewProduct = async () => {
  try {
    const params = {
      name: "New Product",
      description: "This is a new product",
      price: 100,
      tags: ["tag1", "tag2"],
      images: ["image1.jpg", "image2.jpg"],
    };

    // 상품 생성
    const response = await productAPI.createProduct(params);

    // 생성된 상품 데이터를 로그로 출력
    console.log("Created Product:", response);
  } catch (error) {
    // 오류 처리 및 오류 메시지 출력
    console.error("Failed to create product:", error.message);
  }
};

// try/catch를 사용하여 상품 수정하기
// ID로 특정 상품을 수정하고 결과를 로그로 출력하거나 오류가 발생하면 처리
const updateProduct = async (id) => {
  try {
    const params = {
      id,
      name: "Updated Product",
      description: "This is an updated product",
      price: 120,
      tags: ["updatedTag1", "updatedTag2"],
      images: ["updatedImage1.jpg"],
    };

    // 상품 수정
    const response = await productAPI.patchProduct(params);

    // 수정된 상품 데이터를 로그로 출력
    console.log("Updated Product:", response);
  } catch (error) {
    // 오류 처리 및 오류 메시지 출력
    console.error("Failed to update product:", error.message);
  }
};

// try/catch를 사용하여 상품 삭제하기
// ID로 특정 상품을 삭제하고 결과를 로그로 출력하거나 오류가 발생하면 처리
const deleteExistingProduct = async (id) => {
  try {
    // 상품 삭제
    const response = await productAPI.deleteProduct({ id });

    // 삭제된 상품 데이터를 로그로 출력
    console.log("Deleted Product:", response);
  } catch (error) {
    // 오류 처리 및 오류 메시지 출력
    console.error("Failed to delete product:", error.message);
  }
};

// 예시 사용
fetchProductList();
fetchProduct(123);
createNewProduct();
updateProduct(123);
deleteExistingProduct(123);
